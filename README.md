# GiantContext TypeScript SDK

Official TypeScript SDK for the [Giant Context](https://giantcontext.com) API -- an autonomous marketing platform.

[![npm version](https://img.shields.io/npm/v/@giantcontext/sdk-typescript.svg)](https://www.npmjs.com/package/@giantcontext/sdk-typescript)

| Resource | Link |
|---|---|
| npm | [npmjs.com/package/@giantcontext/sdk-typescript](https://www.npmjs.com/package/@giantcontext/sdk-typescript) |
| GitHub | [github.com/giantcontext/sdk-typescript](https://github.com/giantcontext/sdk-typescript) |
| Python SDK | [pypi.org/project/giantcontext](https://pypi.org/project/giantcontext/) |
| Python GitHub | [github.com/giantcontext/sdk-python](https://github.com/giantcontext/sdk-python) |
| Developer Portal | [giantcontext.com/en/developers](https://giantcontext.com/en/developers) |
| Platform | [giantcontext.com](https://giantcontext.com) |

## Installation

```bash
npm install @giantcontext/sdk-typescript
# or
pnpm add @giantcontext/sdk-typescript
# or
yarn add @giantcontext/sdk-typescript
```

## Usage

```typescript
import { createGiantContext } from "@giantcontext/sdk-typescript";

const gc = createGiantContext({
	apiKey: process.env.GIANTCONTEXT_API_KEY!,
});

// Get your organizations
const orgs = await gc.me.listMyOrganizations();
const org = orgs[0];

// List projects in the organization
const { data: projects } = await gc.projects.listProjects({ id: org.id });

// Find the website app in the first project
const project = projects[0];
const { data: apps } = await gc.projectApps.listProjectApps({
	id: org.id,
	projectId: project.id,
});
const websiteApp = apps.find((app) => app.appType === "website");

// List all website pages
const { data: pages } = await gc.website.listWebsitePages({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

console.log(`Found ${pages.length} pages`);
for (const page of pages) {
	console.log(`  ${page.title} - ${page.slug}`);
}
```

## Authentication

The SDK uses API keys that start with `gct_`. Get yours from the Giant Context console under **Settings > API Keys**.

```typescript
const gc = createGiantContext({
	apiKey: "gct_a1b2c3d4e5f6...",
});
```

**How it works:** The SDK automatically exchanges your API key for a short-lived JWT on the first request, then caches the token until 60 seconds before expiry. You never need to manage tokens yourself.

**Environment variable pattern:**

```bash
# .env
GIANTCONTEXT_API_KEY=gct_a1b2c3d4e5f6...
```

```typescript
const gc = createGiantContext({
	apiKey: process.env.GIANTCONTEXT_API_KEY!,
});
```

## Core Concepts

Giant Context organizes content in a hierarchy:

```
Organization (my-company)
└── Project (marketing-site)
    ├── Website App
    │   ├── Pages
    │   ├── Posts (blog)
    │   ├── Layouts
    │   ├── Headers
    │   ├── Footers
    │   ├── Sidebars
    │   └── Dialogs
    ├── Email App
    │   ├── Emails (each carries a natural-language trigger description)
    │   ├── Sends (the delivery timeline Mind plans per contact)
    │   ├── Headers
    │   └── Footers
    ├── CRM App
    │   ├── Contacts
    │   ├── Companies
    │   └── Activities
    ├── Forms App
    │   ├── Forms
    │   └── Submissions
    ├── Knowledge Base App
    │   ├── Articles
    │   └── Categories
    └── Chat App
        └── Conversations
```

**Key entities:**

- **Organizations** -- Top-level workspace. Like a GitHub org, this is your team or company.
- **Projects** -- Within an org. Contains all content, apps, files, and branding for a single site or product.
- **Apps** -- Within a project. Each app type (Website, Email, CRM, Forms, Knowledge Base, Chat) is a separate app instance with its own content.
- **Files** -- Media library shared across all apps in a project. Supports folders, search, and image variants.
- **Branding** -- Design tokens (colors, fonts, logos) applied to apps within a project.
- **Ideas** -- AI-generated content suggestions from Mind (the built-in AI). Review, approve, or dismiss.
- **Drafts** -- AI-generated content with a review workflow: `pending` > `ready` > `accepted`/`rejected` > `published`.

## Working with Organizations and Projects

### List your organizations

```typescript
const orgs = await gc.me.listMyOrganizations();
// [{ id: "d3f1a2b4-...", name: "My Company", slug: "my-company", ... }]
```

### Get an organization by slug

```typescript
const org = await gc.organizations.getOrganizationBySlug({
	slug: "my-company",
});
// { id: "d3f1a2b4-...", name: "My Company", plan: "pro", ... }
```

### List projects

```typescript
const { data: projects, meta } = await gc.projects.listProjects({
	id: org.id,
});
// data: [{ id: "...", name: "Marketing Site", slug: "marketing-site", ... }]
// meta: { total: 3, page: 1, pageSize: 25, pageCount: 1 }
```

### Get a project by slug

```typescript
const project = await gc.projects.getProjectBySlug({
	id: org.id,
	projectSlug: "marketing-site",
});
// { id: "...", name: "Marketing Site", defaultLocale: "en", apps: [...] }
```

### Discover apps in a project

Every project contains one or more apps. Use `listProjectApps` to discover them, then use the `appType` field to find the one you need:

```typescript
const { data: apps } = await gc.projectApps.listProjectApps({
	id: org.id,
	projectId: project.id,
});

const websiteApp = apps.find((a) => a.appType === "website");
const emailApp = apps.find((a) => a.appType === "email");
const crmApp = apps.find((a) => a.appType === "crm");
const formsApp = apps.find((a) => a.appType === "forms");
const kbApp = apps.find((a) => a.appType === "knowledgeBase");
const chatApp = apps.find((a) => a.appType === "chat");
```

Or look up an app directly by slug:

```typescript
const app = await gc.projectApps.getProjectAppBySlug({
	id: org.id,
	projectId: project.id,
	appSlug: "main-website",
});
```

## Working with Website Content

All website methods require `organizationId`, `projectId`, and `appId`. Get these from the org/project/app discovery pattern above.

### List pages

```typescript
const { data: pages, meta } = await gc.website.listWebsitePages({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

for (const page of pages) {
	console.log(`${page.title} (${page.slug})`);
}
```

### Get a single page

```typescript
const page = await gc.website.getWebsitePage({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	pageId: "a1b2c3d4-5678-9abc-def0-1234567890ab",
});
// { id: "...", title: "About Us", slug: "about-us", content: { sections: [...] }, ... }
```

### List blog posts

```typescript
const { data: posts } = await gc.website.listWebsitePosts({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	search: "product launch", // optional: filter by keyword
});
```

### Get a single blog post

```typescript
const post = await gc.website.getWebsitePost({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	postId: "b2c3d4e5-6789-abcd-ef01-234567890abc",
});
```

### Layouts, headers, footers, sidebars

```typescript
// Layouts
const { data: layouts } = await gc.website.listWebsiteLayouts({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

// Headers
const { data: headers } = await gc.website.listWebsiteHeaders({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

// Footers
const { data: footers } = await gc.website.listWebsiteFooters({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

// Sidebars
const { data: sidebars } = await gc.website.listWebsiteSidebars({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});
```

### Dialogs (modals/popups)

```typescript
const { data: dialogs } = await gc.website.listWebsiteDialogs({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});
```

### Tags and URLs

```typescript
// Get all tags used in the website
const tags = await gc.website.listWebsiteTags({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

// Get all page URLs (useful for sitemaps)
const { urls } = await gc.website.listWebsiteUrls({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});
```

### Using `lite` mode

Many list endpoints accept a `lite` parameter. When set to `"true"`, responses omit heavy fields like full content bodies, returning only metadata. Use this for listing/browsing UI:

```typescript
const { data: pages } = await gc.website.listWebsitePages({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	lite: "true", // lighter response, no full content bodies
});
```

## Working with Email

There are no campaigns or segments. Each email carries a natural-language trigger description ("send 48h after signup if onboarding isn't finished"), and Mind decides what to send, when, per contact. The sends timeline is the record of what it planned and delivered.

```typescript
// List emails
const { data: emails } = await gc.email.listEmails({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

// Get a specific email
const email = await gc.email.getEmail({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
	emailId: "c3d4e5f6-7890-abcd-ef01-34567890abcd",
});

// List sends (past + planned deliveries across the app)
const { data: sends } = await gc.email.listEmailSends({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

// A contact's full email timeline (what Mind sent and has planned)
const timeline = await gc.email.getContactEmailTimeline({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
	contactId: "d4e5f6a7-8901-bcde-f012-4567890abcde",
});

// Email headers and footers
const { data: emailHeaders } = await gc.email.listEmailHeaders({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

const { data: emailFooters } = await gc.email.listEmailFooters({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});
```

## Working with CRM

```typescript
// List contacts (with pagination and search)
const { data: contacts, meta } = await gc.crm.listCrmContacts({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	page: "1",
	pageSize: "50",
	search: "jane",
});

// Get a single contact
const contact = await gc.crm.getCrmContact({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	contactId: "d4e5f6a7-8901-bcde-f012-4567890abcde",
});

// List companies
const { data: companies } = await gc.crm.listCrmCompanies({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
});

// Get contacts for a specific company
const companyContacts = await gc.crm.listCrmCompanyContacts({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	companyId: companies[0].id,
});

// List activities (calls, emails, meetings, tasks, notes)
const { data: activities } = await gc.crm.listCrmActivities({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
});

// Get activities for a specific contact
const contactActivities = await gc.crm.listCrmContactActivities({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	contactId: contact.id,
});
```

## Working with Forms

```typescript
// List forms
const { data: forms } = await gc.forms.listForms({
	organizationId: org.id,
	projectId: project.id,
	appId: formsApp.id,
});

// Get a specific form
const form = await gc.forms.getForm({
	organizationId: org.id,
	projectId: project.id,
	appId: formsApp.id,
	formId: forms[0].id,
});

// List submissions for a form
const { data: submissions } = await gc.forms.listFormSubmissions({
	organizationId: org.id,
	projectId: project.id,
	appId: formsApp.id,
	formId: forms[0].id,
	page: "1",
	pageSize: "25",
});

// Get a single submission
const submission = await gc.forms.getFormSubmission({
	organizationId: org.id,
	projectId: project.id,
	appId: formsApp.id,
	formId: forms[0].id,
	submissionId: submissions[0].id,
});
```

## Working with Knowledge Base

```typescript
// List categories
const categories = await gc.other.listKbCategories({
	organizationId: org.id,
	projectId: project.id,
	appId: kbApp.id,
});

// List articles (optionally filter by category or status)
const { data: articles } = await gc.other.listKbArticles({
	organizationId: org.id,
	projectId: project.id,
	appId: kbApp.id,
	categoryId: categories[0]?.id,
	status: "published",
});

// Get a single article
const article = await gc.other.getKbArticle({
	organizationId: org.id,
	projectId: project.id,
	appId: kbApp.id,
	articleId: articles[0].id,
});
```

## Working with Chat

```typescript
// List conversations
const { data: conversations } = await gc.chat.listChatConversations({
	organizationId: org.id,
	projectId: project.id,
	appId: chatApp.id,
});

// Get a conversation with paginated messages
const conversation = await gc.chat.getChatConversation({
	organizationId: org.id,
	projectId: project.id,
	appId: chatApp.id,
	conversationId: conversations[0].id,
	limit: "50",
});
```

## Working with Files

Files are shared across all apps in a project. The files API lives on `gc.projectFiles`.

### List files

```typescript
const { data: files, meta } = await gc.projectFiles.listFiles({
	id: org.id,
	projectId: project.id,
	page: "1",
	pageSize: "50",
});

for (const file of files) {
	console.log(`${file.filename} (${file.mimeType}, ${file.sizeBytes} bytes)`);
	console.log(`  URL: ${file.url}`);
}
```

### Get a single file

```typescript
const file = await gc.projectFiles.getFile({
	id: org.id,
	projectId: project.id,
	fileId: "e5f6a7b8-9012-cdef-0123-567890abcdef",
});
// { id: "...", filename: "hero.jpg", url: "https://...", width: 1920, height: 1080, variants: { thumbnail: {...}, small: {...}, medium: {...}, large: {...} } }
```

### Search files by content

```typescript
const results = await gc.projectFiles.searchProjectFiles({
	id: org.id,
	projectId: project.id,
	query: "product roadmap",
	limit: "10",
});
// [{ fileId: "...", filename: "roadmap.pdf", similarity: 0.87, matchingContent: "..." }]
```

### Save a file from text content

```typescript
const file = await gc.projectFiles.saveFile({
	id: org.id,
	projectId: project.id,
	data: {
		content: "# Meeting Notes\n\nDiscussed Q3 goals...",
		filename: "meeting-notes-2025-01.md",
		mimeType: "text/markdown",
		title: "Q3 Planning Meeting Notes",
	},
});
```

### Folders

```typescript
// List all folders
const folders = await gc.projectFiles.listFileFolders({
	id: org.id,
	projectId: project.id,
});

// Get files in a specific folder
const { data: folderFiles } = await gc.projectFiles.listFiles({
	id: org.id,
	projectId: project.id,
	folderId: folders[0].id,
});

// Get a folder by ID
const folder = await gc.projectFiles.getFileFolder({
	id: org.id,
	projectId: project.id,
	folderId: folders[0].id,
});
```

### Find where a file is used

```typescript
const references = await gc.projectFiles.listFileReferences({
	id: org.id,
	projectId: project.id,
	fileId: file.id,
});
// [{ type: "page", id: "...", name: "About Us", projectId: "..." }]
```

## Working with Drafts

Drafts are AI-generated content that go through a review workflow. When you request content generation, it runs asynchronously. Poll the draft status until it completes.

### List drafts

```typescript
const { data: drafts } = await gc.drafts.listDrafts({
	id: org.id,
	projectId: project.id,
});

for (const draft of drafts) {
	console.log(`${draft.title} [${draft.status}] - ${draft.contentType}`);
}
```

### Request an edit draft

```typescript
const result = await gc.drafts.editDraft({
	data: {
		organizationId: org.id,
		projectId: project.id,
		contentType: "page",
		resourceId: "a1b2c3d4-5678-9abc-def0-1234567890ab",
		prompt: "Rewrite the hero section to focus on enterprise customers",
	},
});
// { draftId: "f6a7b8c9-...", status: "pending" }
```

### Poll for draft completion

```typescript
async function waitForDraft(orgId: string, projectId: string, draftId: string) {
	while (true) {
		const draft = await gc.drafts.getDraft({
			id: orgId,
			projectId,
			draftId,
		});

		if (draft.status === "ready") {
			console.log("Draft is ready for review");
			return draft;
		}
		if (draft.status === "failed") {
			throw new Error(`Draft failed: ${draft.errorMessage}`);
		}

		// Still processing, wait and retry
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
}

const draft = await waitForDraft(org.id, project.id, result.draftId);
console.log(`Quality score: ${draft.qualityScore}`);
console.log(`Items: ${draft.itemCount}`);
```

## Working with Ideas

Ideas are AI-generated content suggestions from Mind. They surface opportunities based on your existing content and knowledge base.

### List ideas

```typescript
const { data: ideas } = await gc.ideas.listIdeas({
	id: org.id,
	projectId: project.id,
});

for (const idea of ideas) {
	console.log(`[${idea.priority}] ${idea.title}`);
	console.log(`  ${idea.description}`);
	console.log(`  Status: ${idea.status}`);
}
```

### Approve an idea

Approving an idea triggers draft generation. You can optionally override the content type or provide a custom prompt:

```typescript
const approved = await gc.ideas.approveIdea({
	id: org.id,
	projectId: project.id,
	ideaId: ideas[0].id,
	data: {
		contentType: "post",
		prompt: "Focus on a beginner audience",
	},
});
// approved.status === "approved"
// approved.draftId will be set once generation starts
```

### Dismiss an idea

```typescript
const dismissed = await gc.ideas.dismissIdea({
	id: org.id,
	projectId: project.id,
	ideaId: ideas[1].id,
	data: {
		reason: "Already covered in the FAQ page",
	},
});
```

## Working with Branding

```typescript
// List brandings for a project
const { data: brandings } = await gc.projectBranding.listProjectBrandings({
	id: org.id,
	projectId: project.id,
});

// Get a specific branding (colors, fonts, logos)
const branding = await gc.projectBranding.getProjectBranding({
	id: org.id,
	projectId: project.id,
	brandingId: brandings[0].id,
});
```

## Pagination

List endpoints return paginated responses with a `meta` object:

```typescript
const { data, meta } = await gc.website.listWebsitePages({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	page: "1",
	pageSize: "25",
});

console.log(`Page ${meta.page} of ${meta.pageCount}`);
console.log(`${meta.total} total items`);
```

### Iterating through all pages

```typescript
async function getAllPages(orgId: string, projectId: string, appId: string) {
	const allPages = [];
	let page = 1;

	while (true) {
		const { data, meta } = await gc.website.listWebsitePages({
			organizationId: orgId,
			projectId: projectId,
			appId: appId,
			page: String(page),
			pageSize: "100",
		});

		allPages.push(...data);

		if (page >= meta.pageCount) break;
		page++;
	}

	return allPages;
}
```

## Error Handling

The SDK throws Axios errors. Inspect `error.response` for API error details:

```typescript
import { AxiosError } from "axios";

try {
	const project = await gc.projects.getProject({
		id: org.id,
		projectId: "nonexistent-id",
	});
} catch (error) {
	if (error instanceof AxiosError && error.response) {
		console.error("Status:", error.response.status); // 404
		console.error("Message:", error.response.data.message); // "Project not found"
		console.error("Code:", error.response.data.code); // "NOT_FOUND"
	} else {
		// Network error, timeout, etc.
		console.error("Request failed:", error.message);
	}
}
```

### Error codes

| Status | Code             | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| 400    | `BAD_REQUEST`    | Invalid parameters or request body         |
| 401    | `UNAUTHORIZED`   | Invalid or expired API key                 |
| 403    | `FORBIDDEN`      | Insufficient permissions for this resource |
| 404    | `NOT_FOUND`      | Resource does not exist                    |
| 429    | `RATE_LIMITED`   | Too many requests. Back off and retry.     |
| 500    | `INTERNAL_ERROR` | Server error. Retry with backoff.          |

## Request IDs and Tracing

Every API response includes an `x-request-id` header for debugging. When reporting issues, include this ID:

```typescript
import axios, { AxiosError } from "axios";

try {
	await gc.projects.getProject({ id: org.id, projectId: "some-id" });
} catch (error) {
	if (error instanceof AxiosError && error.response) {
		const requestId = error.response.headers["x-request-id"];
		console.error(
			`Request failed (${requestId}):`,
			error.response.data.message,
		);
		// Include requestId when contacting support
	}
}
```

## Configuration

```typescript
const gc = createGiantContext({
	// Required: Your API key (get one from Settings > API Keys in the console)
	apiKey: process.env.GIANTCONTEXT_API_KEY!,

	// Optional: Custom API base URL (default: https://api.giantcontext.com)
	baseUrl: "https://api.giantcontext.com",

	// Optional: Request timeout in milliseconds (default: 30000)
	timeout: 30000,
});
```

You can also instantiate the class directly:

```typescript
import { GiantContext } from "@giantcontext/sdk-typescript";

const gc = new GiantContext({
	apiKey: process.env.GIANTCONTEXT_API_KEY!,
});
```

## API Reference

<!-- API_REFERENCE_START -->
260 methods across 33 resources.

- [API Keys](#api-keys) (2)
- [Analytics](#analytics) (2)
- [App Members](#app-members) (2)
- [Bug Reports](#bug-reports) (2)
- [Builder](#builder) (16)
- [CRM](#crm) (8)
- [Chat](#chat) (7)
- [Content Versions](#content-versions) (3)
- [Developers](#developers) (14)
- [Drafts](#drafts) (8)
- [Email](#email) (18)
- [Feature Requests](#feature-requests) (3)
- [Forms](#forms) (7)
- [Health](#health) (1)
- [Ideas](#ideas) (5)
- [Invitations](#invitations) (3)
- [KB](#kb) (13)
- [Me](#me) (6)
- [Organization Members](#organization-members) (5)
- [Organizations](#organizations) (4)
- [People](#people) (22)
- [Plans](#plans) (4)
- [Project Apps](#project-apps) (6)
- [Project Branding](#project-branding) (2)
- [Project Domains](#project-domains) (2)
- [Project Envs](#project-envs) (5)
- [Project Files](#project-files) (15)
- [Project Legal Documents](#project-legal-documents) (5)
- [Project Members](#project-members) (2)
- [Project Trash](#project-trash) (6)
- [Project Workflows](#project-workflows) (4)
- [Projects](#projects) (5)
- [Website](#website) (53)

### API Keys

`gc.apiKeys` — List your own API keys across organizations; never returns the secret value, List all API keys in an organization; metadata only, no secret values, and more.

#### `listMyApiKeys`

List your own API keys across organizations; never returns the secret value
Returns all active API keys belonging to the current user. Each key includes its ID, name, creation date, expiration date, and associated organization. The secret key value is not returned for security.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `organizationId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.apiKeys.listMyApiKeys({
  page: 1,
});
```

---

#### `listOrganizationApiKeys`

List all API keys in an organization; metadata only, no secret values
Returns all active API keys for an organization. Each key object includes its ID, name, creation date, expiration date, and the user it is associated with. The secret key value is never returned in list responses. Requires admin or owner role within the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `userId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.apiKeys.listOrganizationApiKeys({
  organizationId: "uuid-organizationId",
  page: 1,
});
```


---

### Analytics

`gc.analytics` — Website traffic for one project, Traffic and usage across an organization, and more.

#### `getProjectAnalyticsReport`

Website traffic for one project
Returns one analytics report for this project, chosen with 'dimension'. Five cover the public website: 'website-traffic' for views over time, 'website-pages' for the most-read pages, and 'website-countries', 'website-devices' and 'website-cities' for where and how people read it. The rest cover the project's own use of the platform: 'activity' for events over time, 'events-by-category' and 'tokens-by-category' for what those events were and what they cost, 'operations' and 'top-operations' for which operations ran, and 'health' and 'avg-response-time' for how they went. Narrow the range with startDate and endDate and choose the bucket size with interval; reports that group by a column take 'field' and default to the one the report is named for. The whole report comes back in one response unless pageSize asks for a slice of it, and 'meta.total' is its size either way. A report is never silently shortened: if the response would exceed 256KB it is refused with the measurement and with the ways to shrink it — a narrower date range, a coarser interval, a smaller limit, or pageSize to take it a page at a time. Covers only this project — no other organization's figures are reachable through it.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `dimension` | `string` | Yes |
| `appId` | `string` | No |
| `startDate` | `string` | No |
| `endDate` | `string` | No |
| `interval` | `string` | No |
| `field` | `string` | No |
| `limit` | `string` | No |
| `action` | `string` | No |
| `appSlug` | `string` | No |
| `appType` | `string` | No |
| `blockType` | `string` | No |
| `browser` | `string` | No |
| `category` | `string` | No |
| `channel` | `string` | No |
| `city` | `string` | No |
| `contentType` | `string` | No |
| `countryCode` | `string` | No |
| `deviceType` | `string` | No |
| `endpoint` | `string` | No |
| `entityType` | `string` | No |
| `hostname` | `string` | No |
| `httpMethod` | `string` | No |
| `kind` | `string` | No |
| `locale` | `string` | No |
| `mimeType` | `string` | No |
| `model` | `string` | No |
| `os` | `string` | No |
| `outcome` | `string` | No |
| `part` | `string` | No |
| `platform` | `string` | No |
| `project` | `string` | No |
| `projectSlug` | `string` | No |
| `rating` | `string` | No |
| `region` | `string` | No |
| `resource` | `string` | No |
| `resourceType` | `string` | No |
| `role` | `string` | No |
| `source` | `string` | No |
| `sourceType` | `string` | No |
| `status` | `string` | No |
| `statusCode` | `string` | No |
| `tag` | `string` | No |
| `template` | `string` | No |
| `type` | `string` | No |
| `writer` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.analytics.getProjectAnalyticsReport({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
  dimension: "value",
});
```

---

#### `getOrganizationAnalyticsReport`

Traffic and usage across an organization
Returns one analytics report covering every project in this organization, chosen with 'dimension'. Five cover the public websites: 'website-traffic' for views over time, 'website-pages' for the most-read pages, and 'website-countries', 'website-devices' and 'website-cities' for where and how people read them. The rest cover the organization's own use of the platform: 'activity' for events over time, 'events-by-category' and 'tokens-by-category' for what those events were and what they cost, 'operations' and 'top-operations' for which operations ran, and 'health' and 'avg-response-time' for how they went. Narrow the range with startDate and endDate and choose the bucket size with interval; reports that group by a column take 'field', which accepts 'projectSlug' here to split a total between the organization's projects. The whole report comes back in one response unless pageSize asks for a slice of it, and 'meta.total' is its size either way. A report is never silently shortened: if the response would exceed 256KB it is refused with the measurement and with the ways to shrink it — a narrower date range, a coarser interval, a smaller limit, or pageSize to take it a page at a time. Covers only this organization — no other organization's figures are reachable through it.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `dimension` | `string` | Yes |
| `appId` | `string` | No |
| `startDate` | `string` | No |
| `endDate` | `string` | No |
| `interval` | `string` | No |
| `field` | `string` | No |
| `limit` | `string` | No |
| `action` | `string` | No |
| `appSlug` | `string` | No |
| `appType` | `string` | No |
| `blockType` | `string` | No |
| `browser` | `string` | No |
| `category` | `string` | No |
| `channel` | `string` | No |
| `city` | `string` | No |
| `contentType` | `string` | No |
| `countryCode` | `string` | No |
| `deviceType` | `string` | No |
| `endpoint` | `string` | No |
| `entityType` | `string` | No |
| `hostname` | `string` | No |
| `httpMethod` | `string` | No |
| `kind` | `string` | No |
| `locale` | `string` | No |
| `mimeType` | `string` | No |
| `model` | `string` | No |
| `os` | `string` | No |
| `outcome` | `string` | No |
| `part` | `string` | No |
| `platform` | `string` | No |
| `project` | `string` | No |
| `projectSlug` | `string` | No |
| `rating` | `string` | No |
| `region` | `string` | No |
| `resource` | `string` | No |
| `resourceType` | `string` | No |
| `role` | `string` | No |
| `source` | `string` | No |
| `sourceType` | `string` | No |
| `status` | `string` | No |
| `statusCode` | `string` | No |
| `tag` | `string` | No |
| `template` | `string` | No |
| `type` | `string` | No |
| `writer` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.analytics.getOrganizationAnalyticsReport({
  organizationId: "uuid-organizationId",
  page: 1,
  dimension: "value",
});
```


---

### App Members

`gc.appMembers` — Get an app member by ID, List users with explicit app-level roles, excluding inherited org and project access, and more.

#### `getAppMember`

Get an app member by ID
Retrieves the full details of a specific app member by their membership ID. Returns the member's user profile information (name, email, avatar) along with their assigned role within the app and membership timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.appMembers.getAppMember({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  memberId: "uuid-memberId",
});
```

---

#### `listAppMembers`

List users with explicit app-level roles, excluding inherited org and project access
Returns a paginated list of all members who have been explicitly assigned roles at the app level. Each member entry includes the user's profile information (name, email, avatar) and their assigned role within the app. This is separate from organization-level or project-level membership; only users with direct app-level role assignments are returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `role` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.appMembers.listAppMembers({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Bug Reports

`gc.bugReports` — List bug reports you filed, with severity, status and GitHub issue link, List comments for a bug report, and more.

#### `listMyBugReports`

List bug reports you filed, with severity, status and GitHub issue link
Returns a paginated list of bug reports submitted by the current user, filterable by status, severity and source and searchable by title or description. Each report includes its title, description, steps to reproduce, expected/actual behavior, severity, status (open/resolved/cancelled), browser info, page URL, report count, and linked GitHub issue details if any.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `severity` | `string` | No |
| `source` | `string` | No |
| `reportCount` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.bugReports.listMyBugReports({
  page: 1,
});
```

---

#### `listBugReportComments`

List comments for a bug report
Returns all team comments and responses for a specific bug report owned by the current user. Each comment includes its ID, the comment text, the author name, and a creation timestamp. Comments are returned in chronological order.

| Parameter | Type | Required |
|-----------|------|----------|
| `bugReportId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `author` | `string` | No |
| `source` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.bugReports.listBugReportComments({
  bugReportId: "uuid-bugReportId",
  page: 1,
});
```


---

### Builder

`gc.builder` — Get every content type and the blocks allowed in it, Get the styles schema shared by every block, Get one block type's own fields and hints, and more.

#### `getContentTypes`

Get every content type and the blocks allowed in it
Lists every content type — website pages, posts, landings, headers, footers, sidebars, dialogs and layouts; kb articles and landings; developer docs and landings; forms; emails and their headers and footers — with the builder context each belongs to and the exact block types allowed inside it.

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.getContentTypes();
```

---

#### `getBlockStyles`

Get the styles schema shared by every block
Returns the one styles object every block, column and section accepts — margin, padding, width, background, border, box shadow, position, per-breakpoint visibility, entrance animation and cssId/cssClasses. It is identical for every block type and is not repeated on each one. The schema carries its own value-format guidance: which fields take per-breakpoint objects, when a bare number means a theme spacing multiple rather than pixels, and exactly which colour tokens resolve. A per-breakpoint { desktop, tablet, mobile } object sent to a flat field does not error and does not render.

**Returns:** `Promise<{
    styles: unknown;
  }>`

```typescript
const result = await gc.builder.getBlockStyles();
```

---

#### `getBlock`

Get one block type's own fields and hints
Returns the JSON schema for a single block type plus its per-field authoring hints, scoped to (and validated against) the content type's palette. The styles object is identical for every block type and is not repeated here.

| Parameter | Type | Required |
|-----------|------|----------|
| `blockType` | `string` | Yes |
| `contentType` | `string` | Yes |

**Returns:** `Promise<{
    type: string;
    schema: unknown;
    hints: Record<string, unknown>;
  }>`

```typescript
const result = await gc.builder.getBlock({
  blockType: "value",
  contentType: "value",
});
```

---

#### `deleteSection`

Delete a section and every block inside it; recoverable from version history
Removes a section (and its blocks) from a content tree and records a version. Returns the removed section. The prior state is recoverable from version history.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    section: unknown;
  }>`

```typescript
const result = await gc.builder.deleteSection({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `insertSection`

Insert a section into a content tree
Inserts a new section (validated against the section schema, including any blocks it carries) and records a version. Every field on the supplied section is kept; only id and type are server-owned. Ids are generated for the section and for any columns/blocks that omit one. Omit an anchor to append at the end. A section given no columns is created with one empty column.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    section: unknown;
    position: number;
  }>`

```typescript
const result = await gc.builder.insertSection({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `updateSection`

Update a section's own properties; blocks stay untouched and columns cannot be patched
Patches a section's own properties and records a version. Any section field may be patched; id, type and columns are refused with an error rather than ignored. Does not touch its blocks.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    section: unknown;
  }>`

```typescript
const result = await gc.builder.updateSection({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `deleteBlock`

Delete a block, returning it; the prior tree stays in version history
Removes a block from a content tree and records a version. Returns the removed block, plus columnRemoved or sectionRemoved when deleting the block emptied its container: an empty column is pruned (it renders a gap) and, when that empties the whole section, the section is pruned too (it paints an orphan background band). Non-destructive at the history level — the prior state is recoverable from version history.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.deleteBlock({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `insertBlock`

Insert a block into a content tree
Inserts a new block into a content entity's tree and records a version. The block's data is validated against its type's schema and the content's block palette. Returns the created block (with its generated id).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.insertBlock({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `updateBlock`

Update a block's data and/or styles by merging only the fields you send; null clears a field
Merges the supplied fields into a block's data and/or its styles and records a version. Send data, styles, or both; fields you omit keep their current value; send null to clear one. Styles cover padding, margins, borders, background, alignment and hideOnMobile. Locale maps merge per locale, so writing one language leaves the others intact. Validated against the block type's schema.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    block: unknown;
  }>`

```typescript
const result = await gc.builder.updateBlock({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `moveSection`

Move a section before or after a sibling, or append it at the end
Reorders a section to a new position (relative to a sibling, or appended) and records a version. Returns the moved section.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    section: unknown;
  }>`

```typescript
const result = await gc.builder.moveSection({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `moveBlock`

Move a block beside a sibling or into a section, leaving its data unchanged
Relocates a block to a new anchor (next to a sibling, or into a section) and records a version. Returns the moved block.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    block: unknown;
  }>`

```typescript
const result = await gc.builder.moveBlock({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `setContentVisibility`

Set whether content is listed and whether it requires a signed-in reader
Changes who may read a content item and whether anything advertises it, and nothing else — not its content, status, slug or metadata. The two flags are independent. isListed governs whether the item appears in the sitemap, indexes, grids and search; an unlisted item stays live at its own URL, which is 'anyone with the link'. requiresViewerAuth governs whether an anonymous reader is served the body at all; a gated item renders the site's Sign In Page instead, never a 404. All four combinations are meaningful, including listed and gated — a page whose existence is public and whose contents are not. Only website pages and posts can be gated; a KB article, a developer doc or a landing can only be unlisted, and a request to gate one is refused by name. Only the flags sent are changed.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.setContentVisibility({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `unpublishContent`

Unpublish a content item, returning it to draft
Takes a published content item off the public site and returns it to draft. The body, slug and metadata are left untouched, so it can be published again unchanged, and the first-published date is kept rather than cleared.

A pending scheduled publish is cancelled, so an item taken down stays down instead of reappearing when its old schedule comes due. The search engines are told the URL is gone and the public cache is purged, so the page stops being served rather than lingering in a cache or an index. The response reports alreadyInState when the item was a draft already.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.unpublishContent({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `publishContent`

Publish a page, post, article, doc or email — status only, never the body
Sets a content item's status to published and leaves everything else untouched: not its content, slug, layout or metadata. Works for every content type that has a draft/published lifecycle — website pages and posts, KB articles, developer docs and emails. Structural pieces (headers, footers, layouts, landings, forms) are always live and are refused by name. Publishing re-indexes the item for AI search, signals the search engines, and purges the public cache. Re-publishing something already published is not an error; the response says alreadyInState. A publishAt with a future timestamp schedules instead of publishing: the item stays a draft until a job takes it live, and the response returns scheduledPublishAt with status still draft. A publishAt in the past is rejected rather than treated as publish-now, and publishing or unpublishing by hand cancels a schedule already pending. Publishing is refused when the content references a tenant value the project has not defined — a {{env.name}} with no matching entry under Project envs — and the refusal names the values, so define them or remove the references and publish again. Unpublishing is never refused for that reason.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.publishContent({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `searchContent`

Find a string or a block type inside content
Search the content of pages, posts, KB articles and developer docs in a project — by exact case-insensitive string (query), by block type (blockTypes), or both. A text query also searches each section's heading and subheading, not just block copy. Filter by content type and by draft/published status. Every match reports its full location — contentId (canonical type), sectionId, columnId and blockId — plus matchIn (block, heading or subheading). blockTypes is validated against the content type's palette, so an unknown type errors rather than returning an empty result. The field path, locale and snippet are populated for a text query and null for a pure block-type match, and the locale a match reports is the one that holds it — patching a different locale overwrites another language.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `query` | `string` | No |
| `blockTypes` | `string` | No |
| `contentTypes` | `string` | No |
| `status` | `string` | No |
| `limit` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.searchContent({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
});
```

---

#### `getContent`

Get a content tree for editing
Returns the full Section[] content tree (with every section/column/block id) for a content entity — pages, posts, landings, etc. Includes the id of every section, column and block.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `contentType` | `string` | Yes |
| `contentId` | `string` | Yes |

**Returns:** `Promise<{
    content: Array<Record<string, unknown>>;
  }>`

```typescript
const result = await gc.builder.getContent({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  contentType: "value",
  contentId: "uuid-contentId",
});
```


---

### CRM

`gc.crm` — Get one activity's description, writing app and JSON data payload, List the activity timeline for a whole CRM app, newest first, searchable, Log a past-tense sentence onto a contact or company timeline, append-only, and more.

#### `getCrmActivity`

Get one activity's description, writing app and JSON data payload
Returns a single CRM activity by ID. Each activity is a natural-language description of something that happened, tagged with the app that wrote it, with optional JSON metadata and linked contact/company objects.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `activityId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmActivity({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  activityId: "uuid-activityId",
});
```

---

#### `listCrmActivities`

List the activity timeline for a whole CRM app, newest first, searchable
Returns a paginated timeline of CRM activities for the specified app, newest first. Each activity is a natural-language description of something that happened for a contact (or company), tagged with the app that wrote it and optionally enriched with a JSON `data` payload. Supports free-text search across the description.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `contactId` | `string` | No |
| `companyId` | `string` | No |
| `writtenBy` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmActivities({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `logCrmActivity`

Log a past-tense sentence onto a contact or company timeline, append-only
Appends an activity to the CRM timeline. `description` is a natural-language sentence ('Viewed pricing page', 'Unsubscribed from newsletter'). `writtenBy` identifies which app wrote it. Optional `data` carries structured metadata. Link to a contact and/or company via id.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.crm.logCrmActivity({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `listCrmCompanyActivities`

List a company's activity timeline, newest first, whatever app logged it
Returns the natural-language activity timeline for a company, newest first. Each row is a description of something that happened, tagged with the app that wrote it, with optional JSON metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `writtenBy` | `string` | No |
| `contactId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmCompanyActivities({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
  page: 1,
});
```

---

#### `listCrmCompanyContacts`

List contacts linked to one company, paginated, alphabetical by last name
Returns a paginated list of CRM contacts linked to a specific company, ordered by last name then first name. Each contact includes name, email, phone, title, department, status, source, tags, and linked company object.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `source` | `string` | No |
| `title` | `string` | No |
| `department` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmCompanyContacts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
  page: 1,
});
```

---

#### `listCrmCompanyTimeline`

A company's timeline — its people's happenings, one stream
The activity of everyone at a company, merged into one list, newest first. Because this is the people's own activity viewed through their employer, it needs permission to read people across the project as well as access to the company — access to the CRM app alone is not enough and the call is refused.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `limit` | `number` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmCompanyTimeline({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
  page: 1,
});
```

---

#### `getCrmCompany`

Get one company with its profile fields and count of linked contacts
Returns a single CRM company by ID, including name, website, industry, size, annual revenue, contact info, address, tags, custom properties, and a count of associated contacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmCompany({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
});
```

---

#### `listCrmCompanies`

List companies in one CRM app, alphabetical by name, each with contact count
Returns a paginated list of all CRM companies for the specified app. Supports search by company name or industry. Each company includes a count of associated contacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `industry` | `string` | No |
| `size` | `string` | No |
| `email` | `string` | No |
| `website` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmCompanies({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Chat

`gc.chat` — Get chat conversation with paginated messages, Reply into a chat conversation as a human operator, Take over a chat conversation from the AI, and more.

#### `getChatConversation`

Get chat conversation with paginated messages
Retrieve a chat conversation with cursor-based paginated messages. Without a cursor, returns the most recent messages (up to limit). direction=older with cursor/cursorId walks back through history.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `conversationId` | `string` | Yes |
| `cursor` | `string` | No |
| `cursorId` | `string` | No |
| `direction` | `string` | No |
| `limit` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.chat.getChatConversation({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  conversationId: "uuid-conversationId",
});
```

---

#### `replyToChatConversation`

Reply into a chat conversation as a human operator
Send a human operator's reply into a conversation. Persists an 'operator' role message and claims the conversation for the operator if it was not already held. The visitor's widget receives it on its next poll.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `conversationId` | `string` | Yes |
| `data` | `{
    content: string;
  }` | Yes |

```typescript
const result = await gc.chat.replyToChatConversation({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  conversationId: "uuid-conversationId",
  data: { /* ... */ },
});
```

---

#### `takeOverChatConversation`

Take over a chat conversation from the AI
A human operator takes control of a live conversation. While held, the AI answer path stands down and the operator's replies drive the conversation. Returns the resulting hold state.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `conversationId` | `string` | Yes |

**Returns:** `Promise<{
    heldByUserId: string | unknown;
    heldAt: string | unknown;
  }>`

```typescript
const result = await gc.chat.takeOverChatConversation({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  conversationId: "uuid-conversationId",
});
```

---

#### `releaseChatConversation`

Release a chat conversation back to the AI
Release a conversation a human was holding. The AI answer path resumes for the conversation's next visitor message.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `conversationId` | `string` | Yes |

```typescript
const result = await gc.chat.releaseChatConversation({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  conversationId: "uuid-conversationId",
});
```

---

#### `getChatConversationTimeline`

The visitor's trail behind a conversation, newest first
What the visitor in this conversation has done across the whole project — pages read, forms submitted, other conversations — newest first, so whoever answers the chat knows who they are talking to. If the visitor has been identified, their full history is included; if not, it is that browser's own activity.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `conversationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `limit` | `number` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.chat.getChatConversationTimeline({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  conversationId: "uuid-conversationId",
  page: 1,
});
```

---

#### `listChatConversations`

List every visitor conversation in a chat app, most recently updated first
List all chat conversations for a given chat app. Returns a paginated list of conversations with their IDs, titles, visitor IDs, and timestamps. Supports search filtering by conversation title or visitor ID. Results are ordered by most recently updated first. This is an admin-only endpoint used to review and manage all customer chat conversations.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `visitorId` | `string` | No |
| `userId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.chat.listChatConversations({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `listChatEscalations`

List every escalation in a chat app, newest first
List all escalations for a chat app — the escalations inbox. Returns a paginated list with each escalation's status, visitor contact details, summary, originating URL, linked conversation, and timestamps. status is one of collecting_contact, collecting_summary, submitted or cancelled, and filtering it separates open handoffs from submitted or cancelled ones; visitorEmail filters to one person and search matches visitor email or summary. Results are ordered by most recently created first. Admin-only.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `visitorEmail` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.chat.listChatEscalations({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Content Versions

`gc.contentVersions` — Restore an entity to an older version; non-destructive, forward history is kept, Get one version's full content snapshot, which the list tool omits, List one entity's edit history newest first; metadata only, no content snapshots, and more.

#### `restoreContentVersion`

Restore an entity to an older version; non-destructive, forward history is kept
Rolls a content entity back to a prior version. Non-destructive: writes the snapshot's content to the live entity and appends a new 'revert' version, preserving forward history.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `versionId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.contentVersions.restoreContentVersion({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  versionId: "uuid-versionId",
});
```

---

#### `getContentVersion`

Get one version's full content snapshot, which the list tool omits
Returns a single content version including its full Section[] content snapshot.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `versionId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.contentVersions.getContentVersion({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  versionId: "uuid-versionId",
});
```

---

#### `listContentVersions`

List one entity's edit history newest first; metadata only, no content snapshots
Returns the newest-first version history for a single content entity (page, post, landing, etc). Metadata only ; content snapshots are not included. This is the undo/rollback trail for both human and AI edits.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `source` | `string` | No |
| `createdBy` | `string` | No |
| `version` | `string` | No |
| `createdAt` | `string` | No |
| `contentType` | `string` | Yes |
| `contentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.contentVersions.listContentVersions({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
  contentType: "value",
  contentId: "uuid-contentId",
});
```


---

### Developers

`gc.developers` — Get one category's own fields, Delete developer doc category, Update a category's handle, public title and description; cannot re-slug or re-parent it, and more.

#### `getDevelopersDocCategory`

Get one category's own fields
Retrieves a single developer docs category by its ID, including its name, slug, description, parent relationship, icon, and display order. Returns 404 if the category does not exist or has been soft-deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |

**Returns:** `Promise<Record<string, unknown>>`

```typescript
const result = await gc.developers.getDevelopersDocCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
});
```

---

#### `deleteDevelopersDocCategory`

Delete developer doc category
Soft-deletes a developer docs category by moving it to the trash. Returns 404 if the category does not exist or is already deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.developers.deleteDevelopersDocCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
});
```

---

#### `updateDevelopersDocCategoryMeta`

Update a category's handle, public title and description; cannot re-slug or re-parent it
Updates a developer docs category's internal handle, its public title and the description shown alongside it in navigation and listings. Only the fields you send are changed. name is the handle operators search by and no reader ever sees; title is the label in the navigation. Cannot change the category's slug, parent, order or icon — a category slug sits in the public path of every doc beneath it and re-slugging leaves no redirect.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<Record<string, unknown>>`

```typescript
const result = await gc.developers.updateDevelopersDocCategoryMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
  data: { /* ... */ },
});
```

---

#### `listDevelopersDocCategories`

List doc categories as a nested tree, sorted by display order
Lists all developer docs categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories by parentId and sorted by their display order; a root category has a null parentId and each one carries its children inline. Includes all active (non-deleted) categories.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `slug` | `string` | No |
| `icon` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.listDevelopersDocCategories({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createDevelopersDocCategory`

Create a doc category before the docs that reference it; slug must be unique
Creates a new developer docs category in the specified app. name and slug are both required, and the slug is the URL segment: it must be unique within the app or the call fails with a 409. parentId nests the category under another, order sets its position among siblings and is assigned automatically when absent, and icon and description are display only. Categories are used to organize articles within the developer docs.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.developers.createDevelopersDocCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getDevelopersDoc`

Get one doc with its full content, SEO and category ids
Retrieves a single developer doc by its ID, including its full rich text content, publish status, SEO metadata, and associated category IDs. Returns 404 if the article does not exist or has been soft-deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `docId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.getDevelopersDoc({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  docId: "uuid-docId",
});
```

---

#### `deleteDevelopersDoc`

Delete developer doc
Soft-deletes a developer doc by moving it to the trash. Also removes the article from the AI developer docs. Returns 404 if the article does not exist or is already deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `docId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.developers.deleteDevelopersDoc({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  docId: "uuid-docId",
});
```

---

#### `updateDevelopersDocMeta`

Update a doc's name, title, slug, SEO, excerpt, featured image and tags; cannot publish or edit content
Updates the fields that describe a developer doc rather than govern it: SEO title, description, image, noindex, the excerpt, the featured image and tags. Only the fields you send are changed. Can rebind the page shell — the website app it borrows from, and its layout, header and footer. featuredImageUrl takes a file reference (file:{uuid}) from the project's files rather than a resolved URL, and tags replaces the whole list rather than adding to it. Cannot change the doc's content, status, visibility, order or category membership.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `docId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.updateDevelopersDocMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  docId: "uuid-docId",
  data: { /* ... */ },
});
```

---

#### `listDevelopersDocs`

List docs in a developer portal, newest first
Lists all developer docs for the specified app, with support for pagination, filtering by category, filtering by publish status, and full-text search across names and slugs. Returns docs sorted by creation date (newest first) by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `isListed` | `string` | No |
| `categoryId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.listDevelopersDocs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createDevelopersDoc`

Create a doc; slug must be unique, status defaults to draft, isListed to true
Creates a new developer doc in the specified app. name and slug are both required, and the slug is the URL segment: it must be unique within the app or the call fails with a 409. categoryIds files the doc under one or more categories and order sets its position within them; display order is assigned automatically when order is absent. status defaults to 'draft' while isListed defaults to true. A doc created as 'published' with content is also ingested into the AI developer docs for search and retrieval, so publishing is more than a visibility change.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.developers.createDevelopersDoc({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `updateDevelopersLandingMeta`

Update the landing page's SEO title, description and image; not its content
Updates the fields that describe the developer portal landing page rather than govern it: SEO title, description and image. Only the fields you send are changed. Can rebind the page shell — the website app it borrows from, and its layout, header and footer. Cannot change the landing page's content or visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |
| `locale` | `string` | No |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.updateDevelopersLandingMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getDevelopersRedirect`

Get one developer portal URL redirect by id
Returns a single URL redirect by ID, including its fromPath, toPath, status and source.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `redirectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.getDevelopersRedirect({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  redirectId: "uuid-redirectId",
});
```

---

#### `listDevelopersRedirects`

List a developer portal's URL redirects, newest first, with from, to, status and source
Returns a paginated list of the URL redirects for this developers app. Each maps an old path (fromPath) to the current path (toPath) with a status (301 or 308) and a source: auto (recorded when a slug changed) or manual (added by hand).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `source` | `string` | No |
| `status` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.listDevelopersRedirects({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getDevelopersSyncLogs`

Get the SDK and OpenAPI sync status and recent runs; diagnostic only, starts nothing
Returns recent SDK sync events and last-synced timestamps for both OpenAPI and SDK sync, newest first. It is diagnostic only: it reports syncs and cannot start one.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.getDevelopersSyncLogs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```


---

### Drafts

`gc.drafts` — Unarchive a draft back into the default list; already-unarchived is a no-op, Archive an accepted draft to hide it from the default list without deleting, Generate AI edits to existing content; async, returns a pending draftId, and more.

#### `unarchiveDraft`

Unarchive a draft back into the default list; already-unarchived is a no-op
Restores a previously archived draft to the default list.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.unarchiveDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `archiveDraft`

Archive an accepted draft to hide it from the default list without deleting
Hides an accepted draft from the default list without deleting it. Archived drafts are preserved as a record of what was proposed and what was decided. Only accepted or partially_accepted drafts can be archived.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.archiveDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `generateEditDraft`

Generate AI edits to existing content; async, returns a pending draftId
Generates a reviewable edit draft for an existing resource. The AI analyzes the current content, determines what to keep/modify/add/remove, and stages the edited version as a copy — the live content only changes when the draft is accepted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.generateEditDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `getDraft`

Get one draft with its prompt, generated content and status
Retrieves the full details of a single AI-generated content draft including the prompt, generated content, tool calls, and sources. status is 'pending' while the AI is still building, which takes five to fifteen minutes for a new page and less for a component edit, then 'ready', 'failed' or 'cancelled'. qualityScore (0-100) and qualityIssues are present when the vision QA ran. With lite=true the response carries status, qualityScore and errorMessage without the content tree, tool calls or sources.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.getDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `deleteDraft`

Delete a rejected, failed or cancelled draft permanently; other statuses return 409
Permanently deletes a draft. Only rejected, failed, or cancelled drafts can be deleted. Returns 409 if the draft is in any other status (pending, ready, accepted).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.drafts.deleteDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `generateNewDraft`

Generate new content from a prompt; async, takes 5-15 minutes, nothing publishes yet
Generates new content as a reviewable draft from a natural language prompt. The draft is a proposal — nothing publishes until it is accepted. It is asynchronous: the response carries a draftId with status 'pending' while the AI builds layout, content, styles and vision QA in the background, which takes five to fifteen minutes. contentType accepts 'website_page' and defaults to it.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.generateNewDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `createEditDraft`

Create a copy-on-write draft of existing content for manual editing, no AI
Creates a draft copy of existing content for non-destructive editing. The original stays untouched until the draft is accepted. On accept, the copy's content replaces the original. On reject, the copy is deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.createEditDraft({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `listDrafts`

List a project's drafts newest first; archived hidden unless includeArchived
Returns a paginated list of AI-generated content drafts for the specified project. By default archived drafts are hidden — pass includeArchived=true to include them.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `name` | `string` | No |
| `prompt` | `string` | No |
| `contentType` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |
| `includeArchived` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.listDrafts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Email

`gc.email` — Send transactional email, Get one contact's sent and planned emails with per-send opens and clicks, Get one email with its full content blocks and header/footer links, and more.

#### `sendTransactionalEmail`

Send transactional email
Sends a single transactional email to a specific recipient using an email template. Used for one-off emails like order confirmations, password resets, etc.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }>`

```typescript
const result = await gc.email.sendTransactionalEmail({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getContactEmailTimeline`

Get one contact's sent and planned emails with per-send opens and clicks
Returns the unified email timeline for a contact: past sends + planned sends (including staged sends from a Mind sends draft when present), each with per-send engagement stats (opens, clicks, bounced, complained). Each send carries its `draftId` (non-null only while staged in a ready draft). The response-level `draftId` points at the contact's active sends draft when one exists. Order is COALESCE(sent_at, scheduled_for, created_at) DESC so upcoming planned sends appear at the top, then recent sent, then older.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getContactEmailTimeline({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
});
```

---

#### `getEmail`

Get one email with its full content blocks and header/footer links
Returns a single email by ID, including name, subject line, trigger description, full content blocks, header/footer references, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmail({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
});
```

---

#### `deleteEmail`

Delete email
Soft-deletes an email by moving it to the project trash. Can be restored from trash later.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.email.deleteEmail({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
});
```

---

#### `updateEmailMeta`

Update an email's name, slug, subject, preheader and send-trigger sentence, not content or status
Updates the fields that describe an email rather than govern it: its internal name and slug, the subject line, the preheader, and the trigger description saying when the Mind should send it. Only the fields you send are changed. An email is sent rather than served, so its slug is an internal reference and changing it breaks no link. Subject and preheader are the two reader-facing strings, and they are what an inbox prints side by side; emails have no title. Left null, the preheader slot is filled by whatever the body opens with. Can rebind the header and footer. Cannot change the email's content or status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.updateEmailMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  data: { /* ... */ },
});
```

---

#### `listEmails`

List emails in an email app, newest first
Returns a list of all emails for the specified app. Each email includes its name, subject line, trigger description, content blocks, and associated header/footer references. The trigger description is natural language, and it is what Mind reads to decide what to send to which contact and when.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `slug` | `string` | No |
| `name` | `string` | No |
| `headerId` | `string` | No |
| `footerId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.listEmails({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getEmailFooter`

Get one email footer with its block content
Returns a single email footer by ID, including its name, content blocks, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `footerId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  footerId: "uuid-footerId",
});
```

---

#### `deleteEmailFooter`

Delete email footer
Moves an email footer to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `footerId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.email.deleteEmailFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  footerId: "uuid-footerId",
});
```

---

#### `listEmailFooters`

List footers in an email app, newest first
Returns a list of all email footers for the specified app. Footers contain branding, unsubscribe links, and legal text appended to emails.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.listEmailFooters({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createEmailFooter`

Create a footer shell; only name is required, add blocks afterwards
Creates a new email footer with content blocks for branding, unsubscribe links, and legal text. A footer is the usual home for the unsubscribe link and legal text a send requires. The email palette is its own set — emailHeading, emailText, emailButton, emailImage, emailLogo, emailSocialIcons and the like — and a website block is rejected for this content type.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.email.createEmailFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getEmailHeader`

Get one email header with its block content
Returns a single email header by ID, including its name, content blocks, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `headerId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  headerId: "uuid-headerId",
});
```

---

#### `deleteEmailHeader`

Delete email header
Moves an email header to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `headerId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.email.deleteEmailHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  headerId: "uuid-headerId",
});
```

---

#### `listEmailHeaders`

List headers in an email app, newest first
Returns a list of all email headers for the specified app. Headers contain branding and navigation elements prepended to emails.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.listEmailHeaders({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createEmailHeader`

Create a header shell; only name is required, add blocks afterwards
Creates a new email header with content blocks for branding and navigation. A header is shared across emails rather than built per send. The email palette is its own set — emailHeading, emailText, emailButton, emailImage, emailLogo, emailSocialIcons and the like — and a website block is rejected for this content type.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.email.createEmailHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getEmailSend`

Get one send with its full delivery and engagement event log
Returns a single send row and its full event log (delivered/open/click/bounce/complaint/unsubscribe).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `sendId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailSend({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  sendId: "uuid-sendId",
});
```

---

#### `updateEmailSend`

Update a send to reschedule or cancel; only planned and queued rows accept edits
Reschedule, cancel, or adjust metadata on a send row. Cannot modify rows with status='sent' or status='failed'.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `sendId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.updateEmailSend({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  sendId: "uuid-sendId",
  data: { /* ... */ },
});
```

---

#### `listEmailSends`

List past, queued and planned sends across the app, filterable by email or contact
Returns the log of sends (past + planned + queued) for this email app. Filter by email, contact, or status. Sorted by effective time (sent_at, then scheduled_for, then created_at) descending.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `emailId` | `string` | No |
| `contactId` | `string` | No |
| `status` | `string` | No |
| `locale` | `string` | No |
| `recipientEmail` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.listEmailSends({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createEmailSend`

Create a send for one contact; defaults to planned, which sends nothing until queued
Creates a send row, planned or queued — the only two states a send can start in. Mind writes status='planned' rows that it reorders as new CRM activity lands. When Mind commits to firing, it transitions to status='queued' with scheduled_for set; a worker picks it up. The worker alone records 'sent' or 'failed', after it has actually tried, so neither can be asked for here.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.email.createEmailSend({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```


---

### Feature Requests

`gc.featureRequests` — List everyone's feature requests ranked by votes, showing whether you voted, List feature requests you filed, with status, vote count and GitHub issue link, List comments for a feature request, and more.

#### `listPopularFeatureRequests`

List everyone's feature requests ranked by votes, showing whether you voted
Returns all non-merged, non-cancelled feature requests sorted by vote count. Includes whether the current user has voted for each request and the comment count. Does not expose user identity information for privacy.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `priority` | `string` | No |
| `voteCount` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.listPopularFeatureRequests({
  page: 1,
});
```

---

#### `listMyFeatureRequests`

List feature requests you filed, with status, vote count and GitHub issue link
Returns all feature requests submitted by the current user (up to 100). Each request includes its title, description, priority, status (open/planned/shipped/cancelled), vote count, and linked GitHub issue details if any.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `priority` | `string` | No |
| `source` | `string` | No |
| `voteCount` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.listMyFeatureRequests({
  page: 1,
});
```

---

#### `listFeatureRequestComments`

List comments for a feature request
Returns all team comments and responses for a specific feature request owned by the current user. Each comment includes its ID, the comment text, the author name, and a creation timestamp. Comments are returned in chronological order.

| Parameter | Type | Required |
|-----------|------|----------|
| `featureRequestId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `author` | `string` | No |
| `source` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.listFeatureRequestComments({
  featureRequestId: "uuid-featureRequestId",
  page: 1,
});
```


---

### Forms

`gc.forms` — Count what a form blocked, and why, over a recent window, Get one form's fields, settings and content blocks in Builder format, Delete form, and more.

#### `getFormBlockedSubmissions`

Count what a form blocked, and why, over a recent window
Returns how many submissions this form refused in the last windowDays (default 30), grouped by reason, with the most recent occurrence of each. Reasons are 'honeypot' for a trap trip, which is the free always-on trap, and 'captcha:<verdict>' for a refusal by the paid widget. This is the evidence the captcha setting rests on: the product deliberately leaves the decision to a person looking at their own numbers rather than enabling a captcha at some invented spam threshold, so a form with no honeypot trips does not need one. A GET rather than a list — it returns counts, not rows, and the refused payloads are deliberately never stored.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |
| `windowDays` | `number` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.getFormBlockedSubmissions({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
});
```

---

#### `getForm`

Get one form's fields, settings and content blocks in Builder format
Retrieve the full details of a single form by its identifier. Returns the form's unique identifier, associated app identifier, name, URL slug, description, field definitions (each with name, type, and required status), rich content layout (Builder block structure used for rendering), settings (redirect URL, tags, source, success message, submission limit), active/inactive status, and creation and update timestamps. The notification address is an app-level setting rather than a form field.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.getForm({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
});
```

---

#### `deleteForm`

Delete form
Soft-delete a form by moving it to the trash. The form and its data are not permanently destroyed and can potentially be restored. Requires app settings write permission. Returns a success indicator.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.forms.deleteForm({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
});
```

---

#### `updateFormMeta`

Update a form's name and description; cannot re-slug it or change fields
Updates the fields that describe a form rather than govern it: its internal name, its description, and its settings — the message a visitor sees after submitting, the button label, the submission limit and the CRM tags. Only the fields you send are changed, and settings merge per key, so sending one leaves the rest alone. The editable settings are successMessage, submitButtonText, submissionLimit, hideFormOnComplete, closeDialogOnComplete, gcUrlRedirect, captchaEnabled, tags and source. Cannot change the form's slug, fields, content or active status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.updateFormMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
  data: { /* ... */ },
});
```

---

#### `getFormSubmission`

Get one submission's full answers plus its user agent, IP and referer
Retrieve the full details of a single form submission by its identifier. Returns the submission's unique identifier, the parent form identifier, the complete user-submitted data (key-value pairs corresponding to form fields), metadata (user agent, IP address, referer, submission timestamp, tags, source), and the creation timestamp.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |
| `submissionId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.getFormSubmission({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
  submissionId: "uuid-submissionId",
});
```

---

#### `listFormSubmissions`

List one form's submissions, newest first, with submitted data and metadata
Retrieve a paginated list of all submissions received for a specific form. Each submission includes its unique identifier, the parent form identifier, the user-submitted data (key-value pairs corresponding to form fields), metadata (user agent, IP address, referer, submission timestamp, tags, source), and the creation timestamp. search matches case-insensitively against the serialized submission data, so it finds a submission by a value inside it. Sorting is available on createdAt only, newest first by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.listFormSubmissions({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
  page: 1,
});
```

---

#### `listForms`

List forms in a Forms app with their fields and submission counts, newest first
Retrieve a paginated list of all forms belonging to the specified Forms app. Each form in the response includes its unique identifier, name, URL slug, description, field definitions (name, type, required status), rich content layout, settings (redirect URL, tags, source), active/inactive status, creation and update timestamps, and a count of how many submissions have been received. search matches name or slug case-insensitively, and the filter keys are slug, isActive, createdAt and updatedAt. Sorting is available over name, slug, isActive, createdAt and updatedAt, newest first by default; submissionCount cannot be sorted on, because it is counted by a join the pager does not carry.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `slug` | `string` | No |
| `isActive` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.listForms({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Health

`gc.health` — Get a unique LLM-generated message, proving the AI pipeline is live, and more.

#### `getHealthEcho`

Get a unique LLM-generated message, proving the AI pipeline is live
Sends a prompt to the AI service, which calls the language model to generate a unique message. A successful response with a message confirms the full chain is working: API, then AI service, then the model. Each call returns a different message, proving the model is live.

**Returns:** `Promise<{
    status: string;
    message?: string;
    error?: string;
  }>`

```typescript
const result = await gc.health.getHealthEcho();
```


---

### Ideas

`gc.ideas` — Approve a pending idea to start content generation; a draft may follow automatically, Dismiss a pending idea with an optional reason so Mind stops suggesting it, Get one idea's rationale, outline and similarity score, and more.

#### `approveIdea`

Approve a pending idea to start content generation; a draft may follow automatically
Approve an idea, which sets its status to 'approved'. Email sends and focused email edits enqueue durable materialization contracts; another content type generates a draft automatically when its type has draft enabled in aiEntityConfig. The idea must be in 'pending' status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.approveIdea({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  ideaId: "uuid-ideaId",
  data: { /* ... */ },
});
```

---

#### `dismissIdea`

Dismiss a pending idea with an optional reason so Mind stops suggesting it
Dismiss an idea that the user doesn't want to pursue. The idea must be in 'pending' status. Optionally include a reason for dismissal. Dismissed ideas are tracked so Mind doesn't re-suggest them.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |
| `data` | `{
    reason?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.dismissIdea({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  ideaId: "uuid-ideaId",
  data: { /* ... */ },
});
```

---

#### `getIdea`

Get one idea's rationale, outline and similarity score
Returns full details of a Mind idea including title, rationale, outline, priority, similarity score, and status. The rationale says why the content should exist and the outline is a structured brief for generating it; the similarity score measures how far the idea sits from existing content, where lower means a bigger gap. If the idea has status 'pending', it can be approved (triggering draft generation) or dismissed.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.getIdea({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  ideaId: "uuid-ideaId",
});
```

---

#### `listIdeas`

List Mind ideas for a project
Returns a paginated list of Mind ideas for the project. Ideas represent content gaps or suggestions identified by the AI ideation engine, from gap detection across the project's apps — website, KB, email and forms — and each carries a name, rationale, priority and target content type. Filter by status to see pending, approved, dismissed, or drafted ideas.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `priority` | `string` | No |
| `appId` | `string` | No |
| `contentType` | `string` | No |
| `targetContentType` | `string` | No |
| `operationKey` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.listIdeas({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `triggerIdeation`

Trigger Mind ideation for a project
Enqueues a durable Mind ideation contract for this project. Optional 'target' narrows execution to one (contentType, operationKey) operation. Returns the run and contract IDs immediately.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.ideas.triggerIdeation({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Invitations

`gc.invitations` — Resend an invitation, Get an invitation by ID, List invitations sent by an organization: pending, accepted and expired, with role, and more.

#### `resendOrganizationInvitation`

Resend an invitation
Sends the invitation email again to the same address and extends the expiry by seven days. The existing token is kept, so a link from an earlier email still works. The 'invitationId' param is the invitation UUID. Returns the invitation with 'emailSent' reporting whether the mail went out — a false value means the invitation is still pending and the email failed, not that the call failed. Returns 400 if the invitation was already accepted, and 404 if it does not exist. Requires owner or admin role.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `invitationId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.invitations.resendOrganizationInvitation({
  organizationId: "uuid-organizationId",
  invitationId: "uuid-invitationId",
});
```

---

#### `getOrganizationInvitation`

Get an invitation by ID
Retrieves a single invitation by its ID within an organization. Returns the invitation object including invitee email, assigned role, status (pending, accepted, expired), creator, and timestamps. The 'invitationId' param is the invitation UUID. Returns 404 if the invitation does not exist.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `invitationId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.invitations.getOrganizationInvitation({
  organizationId: "uuid-organizationId",
  invitationId: "uuid-invitationId",
});
```

---

#### `listOrganizationInvitations`

List invitations sent by an organization: pending, accepted and expired, with role
Returns a paginated list of pending, accepted, and expired invitations for an organization. Each invitation includes the invitee email, assigned role, status, creation date, and expiration. Supports search by email, filtering by status, and sorting. Requires owner or admin role within the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `role` | `string` | No |
| `email` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.invitations.listOrganizationInvitations({
  organizationId: "uuid-organizationId",
  page: 1,
});
```


---

### KB

`gc.kb` — Get one article including its full content tree, status, SEO and category ids, Delete KB article, Update an article's name, title, slug, SEO fields, excerpt, tags and featured image; cannot publish or edit content, and more.

#### `getKbArticle`

Get one article including its full content tree, status, SEO and category ids
Retrieves a single knowledge base article by its ID, including its full rich text content, publish status, SEO metadata, and associated category IDs. Returns 404 if the article does not exist or has been soft-deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `articleId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.getKbArticle({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  articleId: "uuid-articleId",
});
```

---

#### `deleteKbArticle`

Delete KB article
Soft-deletes a knowledge base article by moving it to the trash. Also removes the article from the AI knowledge base. Returns 404 if the article does not exist or is already deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `articleId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.kb.deleteKbArticle({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  articleId: "uuid-articleId",
});
```

---

#### `updateKbArticleMeta`

Update an article's name, title, slug, SEO fields, excerpt, tags and featured image; cannot publish or edit content
Updates the fields that describe a knowledge base article rather than govern it: SEO title, description, image and noindex, plus the excerpt, tags and featured image. Only the fields you send are changed. featuredImageUrl and seo.image take a file reference (file:{uuid}) rather than a resolved URL, which keeps the image tracked as in-use so it cannot be deleted out from under the article. Can rebind the layout, header and footer. Cannot change the article's content, status, visibility, order or category assignments.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `articleId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.updateKbArticleMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  articleId: "uuid-articleId",
  data: { /* ... */ },
});
```

---

#### `listKbArticles`

List articles in one KB app, newest first
Lists all knowledge base articles for the specified app, with support for pagination, filtering by category, filtering by publish status, and full-text search across names and slugs. Returns articles sorted by creation date (newest first) by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `slug` | `string` | No |
| `status` | `string` | No |
| `isListed` | `string` | No |
| `categoryId` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |
| `publishedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.listKbArticles({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createKbArticle`

Create an article shell; publishing with content also ingests it for AI chat
Creates a new knowledge base article in the specified app. name and slug are both required, and the slug is the URL segment: it must be unique within the app or the call fails with a 409. Display order is assigned automatically, categoryIds files the article under one or more categories, and order sets its position within them. featuredImageUrl takes a file reference (file:{uuid}) rather than a resolved URL, which keeps the image tracked as in-use so it cannot be deleted out from under the article. layoutId, headerId and footerId bind the shell it renders inside, and omitting them inherits the app default. status defaults to 'draft' while isListed defaults to true. If the article is created with 'published' status and has content, it is automatically ingested into the AI knowledge base for search and retrieval.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.kb.createKbArticle({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getKbCategory`

Get one category's name, slug, description, parent and order; not its articles
Retrieves a single knowledge base category by its ID, including its name, slug, description, parent relationship, icon, and display order. Returns 404 if the category does not exist or has been soft-deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |

**Returns:** `Promise<Record<string, unknown>>`

```typescript
const result = await gc.kb.getKbCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
});
```

---

#### `deleteKbCategory`

Delete KB category
Soft-deletes a knowledge base category by moving it to the trash. Returns 404 if the category does not exist or is already deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.kb.deleteKbCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
});
```

---

#### `updateKbCategoryMeta`

Update a category's handle, public title and description; cannot re-slug, reorder or re-parent it
Updates a knowledge base category's internal handle, its public title and its description, the blurb shown beneath it in listings and on its own page. Only the fields you send are changed. name is the handle operators search by and no reader ever sees; title is the label on the page and in listings. Cannot change the category's slug or icon, reorder it, or move it in the hierarchy — a category slug sits in the public path of every article beneath it and re-slugging leaves no redirect.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `categoryId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<Record<string, unknown>>`

```typescript
const result = await gc.kb.updateKbCategoryMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  categoryId: "uuid-categoryId",
  data: { /* ... */ },
});
```

---

#### `listKbCategories`

List a KB app's categories as a nested parent-child tree, roots paginated
Lists all knowledge base categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories by parentId and sorted by their display order; a root category has a null parentId and each one carries its children inline. Includes all active (non-deleted) categories.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `slug` | `string` | No |
| `icon` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.listKbCategories({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createKbCategory`

Create a category, optionally nested under a parent; order assigned automatically
Creates a new knowledge base category in the specified app. name and slug are both required, and the slug is the URL segment: it must be unique within the app or the call fails with a 409. parentId nests the category under another, order sets its position among siblings and is assigned automatically when absent, and icon and description are display only. Categories are used to organize articles within the knowledge base.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.kb.createKbCategory({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `updateKbLandingMeta`

Update knowledge base landing page metadata
Updates the SEO title, description and image of the knowledge base landing page. Only the fields you send are changed. Can rebind its website, layout, header and footer. Cannot replace the landing's builder content or change its visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.updateKbLandingMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getKbRedirect`

Get one knowledge base URL redirect by id
Returns a single URL redirect by ID, including its fromPath, toPath, status and source.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `redirectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.getKbRedirect({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  redirectId: "uuid-redirectId",
});
```

---

#### `listKbRedirects`

List a knowledge base's URL redirects, newest first, with from, to, status and source
Returns a paginated list of the URL redirects for this knowledge base app. Each maps an old path (fromPath) to the current path (toPath) with a status (301 or 308) and a source: auto (recorded when a slug changed) or manual (added by hand).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `source` | `string` | No |
| `status` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.kb.listKbRedirects({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Me

`gc.me` — List your suspension appeal thread, both your messages and admin replies, List the caller's notifications, filterable by read status and type, List organizations you belong to and your role in each, and more.

#### `listMySuspensionMessages`

List your suspension appeal thread, both your messages and admin replies
Returns the full suspension appeal message thread for the current user. Each message includes the sender (user or admin), the message content, and a timestamp. Only available to users with an active or past suspension.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `authorType` | `string` | No |
| `authorId` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.listMySuspensionMessages({
  page: 1,
});
```

---

#### `listMyNotifications`

List the caller's notifications, filterable by read status and type
Returns a paginated list of notifications for the authenticated user. Filters are read status, type, subject — what a notification is about, such as ai-content, billing, or platform for operator notices — and scope, as a scopeKind with its scopeId. Each notification includes its type, title, message, read status, and associated resource reference.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `type` | `string` | No |
| `kind` | `string` | No |
| `scopeKind` | `string` | No |
| `scopeId` | `string` | No |
| `subject` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.listMyNotifications({
  page: 1,
});
```

---

#### `listMyOrganizations`

List organizations you belong to and your role in each
Returns all organizations that the authenticated user is a member of. Each organization includes its ID, name, slug, logo URL, and the user's role within that organization (owner, admin, editor or viewer).

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `slug` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.listMyOrganizations({
  page: 1,
});
```

---

#### `listMyInvitations`

List pending org invitations addressed to the caller's email, with offered role
Returns a paginated list of pending organization invitations addressed to the current user's email. Each invitation includes the organization name, the role offered, who sent it, and when it was created. Supports standard pagination query parameters.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `role` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.listMyInvitations({
  page: 1,
});
```

---

#### `listMyActivities`

List activity by or affecting you, with the resource each touched, paginated
Returns a paginated list of activities performed by or affecting the current user. Each activity includes the action taken, the resource type and ID involved, the actor, and a timestamp. Filter by action or resourceType, sort with sort=field:direction, and page with page and pageSize.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `action` | `string` | No |
| `resourceType` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.listMyActivities({
  page: 1,
});
```

---

#### `getMe`

Get current user profile and memberships
Returns the authenticated user's profile: name, email, avatar, active status, notification preferences, suspension status, an isPlatformAdmin flag, and the organizations and projects they hold a membership on with their role in each. There is no account-wide role: access is held per organization, project and app, so read 'organizations[].memberRole' and 'projects[].role'. The 'permissions' array is the platform surface and is empty for every non-platform-admin by design, because a permission scoped to an organization, project or app cannot be expressed as a flat global list. Auto-provisions new users on first login.

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMe();
```


---

### Organization Members

`gc.organizationMembers` — List all organization projects with one member's access level, null where none, List every app with one member's role; project roles do not grant app access, Get member activities, and more.

#### `listMemberProjectMemberships`

List all organization projects with one member's access level, null where none
Returns a list of all projects in the organization along with the specified member's access level for each project. Each entry includes the project ID, name, and the member's role/permission level within that project (or null if they have no direct project membership). Answers what a member can reach across the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `memberId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `role` | `string` | No |
| `joinedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.listMemberProjectMemberships({
  organizationId: "uuid-organizationId",
  memberId: "uuid-memberId",
  page: 1,
});
```

---

#### `listMemberAppMemberships`

List every app with one member's role; project roles do not grant app access
Returns every app across the organization's projects along with the specified member's role on each, or null where they have no binding. Since a project role no longer grants access inside an app, this is what shows which apps a member can actually work in. Each entry carries its project so the apps can be grouped under the project they belong to.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `memberId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `appType` | `string` | No |
| `role` | `string` | No |
| `projectId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.listMemberAppMemberships({
  organizationId: "uuid-organizationId",
  memberId: "uuid-memberId",
  page: 1,
});
```

---

#### `listOrganizationMemberActivities`

Get member activities
Returns a paginated activity feed for a specific member within an organization. Activities include actions the member has performed such as project updates, document edits, member management changes, and settings modifications. Each activity entry includes the action type, resource details, and timestamp. Supports pagination via page and pageSize query parameters.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `memberId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `action` | `string` | No |
| `resourceType` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.listOrganizationMemberActivities({
  organizationId: "uuid-organizationId",
  memberId: "uuid-memberId",
  page: 1,
});
```

---

#### `getOrganizationMember`

Get one member's profile, role, title and join date by member UUID
Retrieves a single organization member by their member ID. Returns the member object including user profile (name, email, avatar), role, title, and join date. The 'memberId' param is the member UUID. Returns 404 if the member does not exist in this organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.getOrganizationMember({
  organizationId: "uuid-organizationId",
  memberId: "uuid-memberId",
});
```

---

#### `listOrganizationMembers`

List members of an organization with their roles, paginated and searchable
Returns a paginated list of all members in an organization. Each member object includes the member ID, user profile (name, email, avatar), role (owner, admin, editor, viewer), title, and join date. Supports search by name or email, filtering by role, and sorting. Pagination is controlled via page and pageSize query parameters.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `role` | `string` | No |
| `title` | `string` | No |
| `userId` | `string` | No |
| `invitedBy` | `string` | No |
| `joinedAt` | `string` | No |
| `invitedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.listOrganizationMembers({
  organizationId: "uuid-organizationId",
  page: 1,
});
```


---

### Organizations

`gc.organizations` — Get a service account, List an organization's service accounts, newest first, Get one organization's name, slug, status and member count by ID, and more.

#### `getServiceAccount`

Get a service account
Returns the full details of a specific service account, including its name, description, role, and creation metadata. Only organization owners and admins can view service account details.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `accountId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.getServiceAccount({
  organizationId: "uuid-organizationId",
  accountId: "uuid-accountId",
});
```

---

#### `listServiceAccounts`

List an organization's service accounts, newest first
Returns all service accounts configured for the organization. Service accounts are non-human identities used for programmatic API access via API keys. Only organization owners and admins can view service accounts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `email` | `string` | No |
| `createdAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.listServiceAccounts({
  organizationId: "uuid-organizationId",
  page: 1,
});
```

---

#### `getOrganization`

Get one organization's name, slug, status and member count by ID
Retrieves a single organization by its unique ID. Returns the full organization object including name, slug, logo URL, status, member count, and timestamps. Returns 404 if the organization does not exist.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.getOrganization({
  organizationId: "uuid-organizationId",
});
```

---

#### `getOrganizationBySlug`

Get an organization from a URL slug when you have no ID
Retrieves a single organization by its URL-friendly slug (e.g. 'my-company'). Returns the full organization object including ID, name, slug, logo URL, status, member count, and timestamps. Resolves an organization from a URL or from user input that carries the slug but not the ID. Returns 404 if no organization matches the given slug.

| Parameter | Type | Required |
|-----------|------|----------|
| `slug` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.getOrganizationBySlug({
  slug: "my-item",
});
```


---

### People

`gc.people` — Approve the compiled segment for consumption, Live membership preview — total, deliverable, sample, Erase a person — sever, scrub, retain, and more.

#### `approveSegment`

Approve the compiled segment for consumption
The human half of the two-gate design: Mind compiled the description into a tree, the console showed the tree and its live preview, and this records that a person looked and said yes. An uncompiled or error-state segment cannot be approved, and any later description edit clears the approval again.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `segmentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.approveSegment({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  segmentId: "uuid-segmentId",
});
```

---

#### `getSegmentPreview`

Live membership preview — total, deliverable, sample
Dynamic evaluation of the compiled tree over live people, run at request time — membership is never stored. Total and deliverable diverge honestly: a segment is an audience selector, consent lives on the email identifier and is enforced again at send-claim time, so the preview shows both numbers rather than pretending they are one, alongside a sample of members. It evaluates a compiled segment whether or not that compilation has been approved, so the numbers an approver weighs are available while the segment is still unapproved.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `segmentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.getSegmentPreview({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  segmentId: "uuid-segmentId",
});
```

---

#### `erasePerson`

Erase a person — sever, scrub, retain
The delete-me flow (artefact-retention-and-scrubbing): runs every app's forget handler while the person still resolves — chat transcripts blanked wholesale, submission values and delivery addresses scrubbed by field type, tenant-authored content untouched — then tombstones the email identifiers (Apollo's rule: deletion without a tombstone is a revolving door) and deletes the person, severing every reference. Every row and every aggregate survives; the only data destroyed is data that could name somebody. The returned ledger row stays pending until every handler reports done; a failed request is visible and safely re-run. One behavior, no settings. Operator-authenticated, so no email confirmation is required on this path.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |

```typescript
const result = await gc.people.erasePerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
});
```

---

#### `setPersonField`

Set one custom field on a person, merging into properties
Merges one key into the person's custom properties without touching the others. Holds ad-hoc structured data a person carries, such as plan, score or region. The value is stored in a provenance envelope {value, at, source: 'manual'}; pass the plain value, and an envelope you previously read passes through unchanged.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |
| `data` | `{
    key: string;
    value: unknown;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.setPersonField({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
  data: { /* ... */ },
});
```

---

#### `listPersonTimeline`

A person's activity across the project, newest first
Everything one person has done across the whole project, newest first: pages read, forms submitted, chats held, emails received. Their anonymous browsing is included — activity recorded before the person was identified is joined to them once they are, so the history does not start at the moment they gave their name. Each entry carries a plain-language description of what happened and, where there is something to count, the numbers behind it. Erasing a person empties this view without deleting the underlying activity. Erasing the person empties this list without deleting any of the stored activity behind it.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `limit` | `number` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.listPersonTimeline({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
  page: 1,
});
```

---

#### `tagPerson`

Tag one person with a single free-form string, idempotent, returns the person
Adds a tag to a person. Tags are free-form strings used for segmenting, gating marketing messages, and ad-hoc grouping. Idempotent — adding an existing tag is a no-op.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |
| `data` | `{
    tag: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.tagPerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
  data: { /* ... */ },
});
```

---

#### `untagPerson`

Remove one tag from a person, returns the person
Removes a tag from a person. Removing a tag the person does not carry is a no-op.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |
| `data` | `{
    tag: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.untagPerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
  data: { /* ... */ },
});
```

---

#### `getPersonPropertyKeys`

Every property key the project's people carry, with counts
The census behind property hygiene: each key pinned on any person, how many people carry it, a few sample values, and the sources that wrote it. Keys drift — team_size, company_size, how_big_is_your_team — and this is the single read every hygiene surface works from: the console, the authoring-time hint, and the Mind pass that proposes merges.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.getPersonPropertyKeys({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
});
```

---

#### `mergePersonPropertyKeys`

Merge a drifted property key into its canonical name
Rewrites fromKey to toKey on every person carrying it. When a person carries both, the newer envelope wins — the same last-write-wins rule every property write follows — and a moved envelope records mergedFrom, so the rename stays on the record. This is the deterministic executor an approved merge proposal runs through: Mind judges sameness, core moves the data.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `{
    fromKey: string;
    toKey: string;
  }` | Yes |

**Returns:** `Promise<{
    peopleMoved: number;
  }>`

```typescript
const result = await gc.people.mergePersonPropertyKeys({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `getSegment`

One segment — description, compiled tree, gates
The full segment record including the compiled filter tree, which the console renders back to the author — showing the compilation is the design's safety: nothing is approved unseen, and nothing unapproved is consumed. The record carries the tenant's own description, the compiled tree, any compile error, and the two gates.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `segmentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.getSegment({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  segmentId: "uuid-segmentId",
});
```

---

#### `updateSegment`

Update a segment; a new description clears both gates
The description is the definition, so editing it invalidates its compilation and approval together — a stale tree shown as current would be a wrong audience wearing a green checkmark — and enqueues a fresh mind.segment.compile contract. The segment is not consumable again until it recompiles and a human re-approves. A rename alone touches neither gate.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `segmentId` | `string` | Yes |
| `data` | `{
    name?: string;
    description?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.updateSegment({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  segmentId: "uuid-segmentId",
  data: { /* ... */ },
});
```

---

#### `deleteSegment`

Delete a segment definition
Removes the saved definition and its compilation. Membership is computed, never stored, so deletion touches no person and leaves nothing behind.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `segmentId` | `string` | Yes |

```typescript
const result = await gc.people.deleteSegment({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  segmentId: "uuid-segmentId",
});
```

---

#### `getPerson`

Get one person with all fields, tags and the CRM company overlay
Returns a single person by ID. Fields include name, the email identifier's address and subscription state, phone, title, department, status, source, tags, and the CRM company when one is linked.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.getPerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
});
```

---

#### `updatePerson`

Update person
Updates a person. All fields are optional — only provided fields change. A changed email replaces the person's email identifier (the subscription flag carries across); 409 on an email or phone another person already holds.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `personId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.updatePerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  personId: "uuid-personId",
  data: { /* ... */ },
});
```

---

#### `getPersonByEmail`

Resolve a person by email address
Looks the address up in the project's identifier table and returns the person it points at. 404 when the address is unknown or unlinked. The lookup is one identifier read — no app hunt, no search.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `email` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.getPersonByEmail({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  email: "value",
});
```

---

#### `identify`

Attach an email address to an anonymous visitor
Attaches an email address to the person behind a browser, finding them or creating them, so everything that browser did before now belongs to a named person. Profile fields are filled in from the traits provided, and existing values are never overwritten. Typing an address does not prove ownership of it, so the address is recorded as claimed rather than verified and grants no access to anything. An address that has asked to be forgotten creates nobody and is treated as if the visitor were still anonymous.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.identify({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `listErasures`

The deletion ledger, newest first
Every erasure the project has run — the tenant's record that a deletion request was honoured, and the work queue that makes a half-finished one visible: a request stays pending until every app's forget handler reports done, and a failed row shows which handler stopped and why. Rows deliberately identify nobody: no name, no address — the suppression tombstone on the identifier is what blocks a re-add; this only proves the erasure ran.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.listErasures({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `listSegments`

The project's segments — saved, compiled views over people
Segments are audiences defined in the tenant's own words and compiled by Mind into a deterministic filter tree (natural-language-segments). Membership is never stored: every read evaluates the compiled tree over live people, so an erased person vanishes from every segment instantly. Each row shows both gates — compiledAt (Mind produced a valid tree) and approvedAt (a human approved the shown compilation) — and no consumer may read membership until both are set.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.listSegments({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `createSegment`

Create a segment from a plain-language description
The description is the definition — the source of truth Mind compiles once (mind.segment.compile, a durable contract enqueued here) into a deterministic filter tree. The tree is then shown, previewed and explicitly approved before any consumer may read membership. Names are unique per project, case-insensitively, because segments are addressed by name in tenant prose.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `{
    name: string;
    description: string;
  }` | Yes |

```typescript
const result = await gc.people.createSegment({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `listPeople`

List a project's people, alphabetical by last name, search supported
Returns a paginated list of the project's people — everyone the project knows, whether or not a CRM app is installed. search matches on name. Each person carries their email identifier's address and subscription state, and the CRM company overlay when one exists.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `source` | `string` | No |
| `title` | `string` | No |
| `department` | `string` | No |
| `locale` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.people.listPeople({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `createPerson`

Create person
Creates a person in the project. Requires firstName and lastName. An email becomes a linked identifier (asserted — typing an address proves nothing about owning it), and email uniqueness is per project. Optionally file under a CRM company via companyId.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.people.createPerson({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `track`

Record something a visitor did
Records one thing a visitor did, permanently: who it was, what it concerned, a plain-language description of what happened, and any exact values worth keeping. It works for visitors nobody has named yet — the activity is held against the browser and joins a person later if an email is ever attached to it. The description must not contain personal details such as a name or an address; those live on the person and are looked up when the activity is read.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.people.track({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Plans

`gc.plans` — Approve a ready plan, which starts draft generation from its draft prompt, Reject a ready plan so it never reaches draft generation, Get one plan's full paper trail from idea to draft prompt, and more.

#### `approvePlan`

Approve a ready plan, which starts draft generation from its draft prompt
Approves a ready Mind plan and starts draft generation from the plan's canonical draft prompt. The plan must be in 'ready' status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `planId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.plans.approvePlan({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  planId: "uuid-planId",
});
```

---

#### `rejectPlan`

Reject a ready plan so it never reaches draft generation
Rejects a ready Mind plan so it cannot be used to generate a draft.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `planId` | `string` | Yes |
| `data` | `{
    reason?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.plans.rejectPlan({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  planId: "uuid-planId",
  data: { /* ... */ },
});
```

---

#### `getPlan`

Get one plan's full paper trail from idea to draft prompt
Returns full details of a Mind plan, including stream selection, discovery, plan, design, audit, retry history, and draft prompt/spec artifacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `planId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.plans.getPlan({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  planId: "uuid-planId",
});
```

---

#### `listPlans`

List Mind plans for a project
Returns a paginated list of Mind plans for the project. Plans are the prepared bridge between ideas and generated drafts: each one says how an idea was prepared for generation, and carries its status, stream, planning and audit artifacts and the final draft prompt and spec.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `status` | `string` | No |
| `contentType` | `string` | No |
| `targetContentType` | `string` | No |
| `ideaId` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |
| `startedAt` | `string` | No |
| `completedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.plans.listPlans({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Apps

`gc.projectApps` — Get a project app by slug, Read one app's settings, whatever kind of app it is, Change one app's settings, merging into what is already there, and more.

#### `getProjectAppBySlug`

Get a project app by slug
Retrieves the full details of a single app by its URL-friendly slug within the specified project. An alternative to looking up an app by ID when the slug is known but the ID is not. Returns the same complete app object as the get-by-ID endpoint including name, slug, app type, configuration, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appSlug` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getProjectAppBySlug({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appSlug: "my-app",
});
```

---

#### `getAppSettings`

Read one app's settings, whatever kind of app it is
Returns the app's settings object together with the schema describing what that app accepts, so a caller can discover the shape without knowing the app type in advance. The shape comes from the app's own declaration, not from a list maintained here. Answers 404 with NO_APP_SETTINGS for an app type that has no settings, and names the ones that do. This is where a form's submission notifications address lives (the forms app's notifyEmail), where a chat escalation goes (the chat app's escalationEmail), and which layout new pages inherit (the website app's pageDesign).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getAppSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `updateAppSettings`

Change one app's settings, merging into what is already there
Merges the given keys into the app's settings, validating them against the app's own declared schema — an unknown key or a wrong type is a 400 naming the offending key, not a silent write. These are app-level settings — the forms notification address, chat escalation routing, the website's default page shell — and not the settings on an individual page, form or email. Only the keys sent are changed; omitted keys keep their value. Send a key as null to clear it.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `{
    settings: Record<string, unknown>;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.updateAppSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getProjectApp`

Get a project app by ID
Retrieves the full details of a single app by its unique ID within the specified project. Returns the app's name, slug, app type, configuration settings, and timestamps. The app must belong to the specified project or a 404 error is returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getProjectApp({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `listDeletedProjectApps`

List soft-deleted apps in a project's trash, restorable or permanently deletable
Returns a list of all soft-deleted (trashed) apps within the specified project. These are apps that have been deleted but not yet permanently removed. Each app includes its full details including name, slug, app type, and deletion timestamp. Trashed apps can be restored using the restore endpoint or permanently deleted using the permanent delete endpoint.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `slug` | `string` | No |
| `appType` | `string` | No |
| `isActive` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.listDeletedProjectApps({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `listProjectApps`

List a project's active apps and their types to obtain the appId
Returns a paginated list of all active (non-deleted) apps configured within the specified project. Apps represent individual applications such as websites, email, forms, knowledge bases, chat widgets, CRM instances, developer docs, or socials. Each app includes its unique ID, name, slug, app type, configuration, and timestamps; the app ID is what every app-level operation is addressed by. Trashed apps are not in this list. Supports pagination and search filtering.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `slug` | `string` | No |
| `appType` | `string` | No |
| `isActive` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.listProjectApps({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Branding

`gc.projectBranding` — Get one branding profile's colors, fonts, logos and favicon, List a project's named branding profiles: colors, fonts, logos, favicon, and more.

#### `getProjectBranding`

Get one branding profile's colors, fonts, logos and favicon
Retrieves the full details of a specific branding configuration by its unique ID within the specified project. Returns the branding's name and complete set of visual identity settings including primary and secondary colors, font selections, logo URLs, favicon, and any other configured styling properties. The branding must belong to the specified project.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `brandingId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectBranding.getProjectBranding({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  brandingId: "uuid-brandingId",
});
```

---

#### `listProjectBrandings`

List a project's named branding profiles: colors, fonts, logos, favicon
Returns a paginated list of all branding configurations for the specified project. Projects can have multiple named branding profiles (e.g., 'Website Brand', 'LMS Brand'), each containing visual identity settings such as primary and secondary colors, font selections, logo URLs, and favicon. Each branding entry includes its unique ID, name, and the full set of configured styling properties.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdBy` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectBranding.listProjectBrandings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Domains

`gc.projectDomains` — Get the exact DNS record the owner must add to verify a domain, List a project's manageable domains with verification status and owning app, and more.

#### `getDomainVerificationInstructions`

Get the exact DNS record the owner must add to verify a domain
Retrieves the DNS verification instructions for the specified custom domain. Returns the exact DNS record (type, name, and value) that must be added to the domain's DNS configuration at the domain registrar to prove ownership. This is required before the domain can be verified and used for serving content. The instructions include the CNAME or TXT record details needed for the verification process.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `domainId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectDomains.getDomainVerificationInstructions({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  domainId: "uuid-domainId",
});
```

---

#### `listProjectDomains`

List a project's manageable domains with verification status and owning app
Returns a comprehensive list of all domains (both auto-generated and custom) across all apps within the specified project. Each domain entry includes its hostname, its verification status, one of pending_dns, verifying_dns, provisioning_cert, provisioning_map, active or failed, whether it is generated or custom, whether it is the primary domain for its app, and the associated app name and slug. Domains are grouped by app and sorted with generated domains first and primary domains prioritized.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `appId` | `string` | No |
| `appType` | `string` | No |
| `hostname` | `string` | No |
| `isGenerated` | `string` | No |
| `isPrimary` | `string` | No |
| `isVerified` | `string` | No |
| `verificationStatus` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectDomains.listProjectDomains({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Envs

`gc.projectEnvs` — Read a tenant value, Change a tenant value, Remove a tenant value, and more.

#### `getProjectEnv`

Read a tenant value
Returns a single tenant value by id. Values are public — they render into pages anyone can load.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `envId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectEnvs.getProjectEnv({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  envId: "uuid-envId",
});
```

---

#### `updateProjectEnv`

Change a tenant value
Replaces the text of a tenant value. Every page referencing the name is revalidated, so the new text is what the public site serves rather than the cached old one. The name itself is not editable — renaming would break the pages pointing at the old name without telling anyone. Values are public: they render into pages anyone can load, so they must never hold credentials, and a request to remember a credential should be refused rather than stored here.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `envId` | `string` | Yes |
| `data` | `{
    value: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectEnvs.updateProjectEnv({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  envId: "uuid-envId",
  data: { /* ... */ },
});
```

---

#### `deleteProjectEnv`

Remove a tenant value
Deletes a tenant value. A value that content still references cannot be deleted: the request is refused with 409 and the message names every page, article or doc that uses the name, so the references can be removed first. This is the same protection a file in use already has.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `envId` | `string` | Yes |

```typescript
const result = await gc.projectEnvs.deleteProjectEnv({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  envId: "uuid-envId",
});
```

---

#### `listProjectEnvs`

List a project's tenant values
Returns every tenant value defined for the project. These are referenced from content as {{env.name}} and resolved when a page renders, so that a value lives in one place rather than being copied into each page that needs it. All values are public.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectEnvs.listProjectEnvs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `createProjectEnv`

Define a tenant value
Creates a tenant value the project's content can reference as {{env.name}}. Values are public — they render into pages anyone can load — so they must never hold credentials: an API key, password, token or private URL stored here is published. If you were asked to remember a credential, refuse and say this is not a secret store. A name may be defined once per project.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `{
    name: string;
    value: string;
  }` | Yes |

```typescript
const result = await gc.projectEnvs.createProjectEnv({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Project Files

`gc.projectFiles` — Restore a file or folder from the file trash, List places where a file is referenced, Get one folder's name and parent, and more.

#### `restoreFileTrashItem`

Restore a file or folder from the file trash
Restores a file or folder from the file trash back to the file manager, rebuilt from the snapshot taken when it was deleted. For folders, optionally restores all contained files and subfolders. A file whose folder is itself still in the trash comes back at the root; restoring the folder brings the whole subtree back in one action and keeps the arrangement. Requires specifying the item type (file or folder) in the request body. Returns counts of restored files and folders for folder-type items.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `itemId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.restoreFileTrashItem({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  itemId: "uuid-itemId",
  data: { /* ... */ },
});
```

---

#### `listFileReferences`

List places where a file is referenced
Returns a comprehensive list of all entities that reference this file across the project. This includes pages, headers, footers, blog posts, templates, sidebars, dialogs, forms, and branding settings. Answers what changes if the file is deleted or replaced.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `type` | `string` | No |
| `id` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.listFileReferences({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
  page: 1,
});
```

---

#### `getFileFolder`

Get one folder's name and parent
Retrieves the details of a single folder in the project file manager, including its name, parent folder ID, and creation metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `folderId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFileFolder({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  folderId: "uuid-folderId",
});
```

---

#### `deleteFileFolder`

Delete a folder and its contents to the file trash
Soft-deletes a folder and all its contents (files and subfolders) by moving them to the file trash. The folder and its contents can be restored from trash before permanent deletion. Returns a count of deleted folders and files.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `folderId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.projectFiles.deleteFileFolder({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  folderId: "uuid-folderId",
});
```

---

#### `replaceFileContent`

Replace a text file's content in place; id, URL and references stay unchanged
Replaces the content of an existing text file. The file must be a text-based type (Markdown, plain text, CSV, JSON, YAML, HTML, CSS, JS, XML, SVG). The file's storage object is overwritten, its size is updated, and AI embeddings are re-generated from the new content. The file ID, URL, metadata, and all references remain unchanged.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |
| `data` | `{
    content: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.replaceFileContent({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
  data: { /* ... */ },
});
```

---

#### `permanentDeleteFileTrashItem`

Permanently delete a file or folder from the file trash
Permanently and irreversibly deletes a file or folder from the file trash. For files, also removes the file from cloud storage. For folders, recursively deletes all contained files and subfolders. Requires specifying the item type (file or folder) in the request body. Nothing brings it back, and anything still pointing at the file — a page's featured image, a block's media — is left referencing something that no longer exists.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `itemId` | `string` | Yes |
| `data` | `{
    type: "file" | "folder";
  }` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.projectFiles.permanentDeleteFileTrashItem({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  itemId: "uuid-itemId",
  data: { /* ... */ },
});
```

---

#### `openFile`

Open a file's content inline: text as string, images as base64, 10 MB cap
Returns the actual content of a file inline — text as a string, images as base64. Text files (Markdown, CSV, JSON, YAML, plain text, HTML, CSS, JS, XML, SVG) are returned in the 'content' field. Image files (PNG, JPG, GIF, WebP) are returned as base64 in the 'base64Content' field. Files over 10 MB or unsupported types return 404.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.openFile({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `emptyFileTrash`

Empty trash (permanently delete old items)
Permanently deletes all items from the file trash, optionally filtering to only delete items older than a specified number of days. Removes files from cloud storage and recursively deletes folder contents, across the whole trash rather than one item — including entries someone else trashed and may have meant to restore. An age in days narrows it to entries older than that. Returns counts of deleted files and folders.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `{
    olderThanDays?: number;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.emptyFileTrash({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `getFile`

Get one file's metadata only: URL, type, size and folder
Retrieves the full details of a single file in the project file manager, including its filename, MIME type, size, dimensions, storage URL, alt text, caption, and folder assignment.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFile({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `deleteFile`

Delete a file
Soft-deletes a file from the project file manager by moving it to the file trash. The file can be restored from trash before it is permanently deleted. Also removes the file from cloud storage if permanently deleted later.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.projectFiles.deleteFile({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `listFileFolders`

List file folders in a project
Returns all folders in the project file manager. Filter by parentId to list only the children of one folder, or parentId_isnull=true for the project root. Omit both to list every folder in the project. Folders are used to organize uploaded files (images, documents, media).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `parentId` | `string` | No |
| `name` | `string` | No |
| `createdBy` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.listFileFolders({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `searchFiles`

Search file contents by meaning; returns matching snippet and relevance score per file
Searches project files by their content using semantic/AI search. Returns the file records whose content matches the meaning of the query — id, filename, mime type and url — ranked by relevance, each with the snippet that matched. The unit of the result is the file rather than the passage.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `mimeType` | `string` | No |
| `similarity` | `string` | No |
| `filename` | `string` | No |
| `query` | `string` | Yes |
| `limit` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.searchFiles({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
  query: "search term",
});
```

---

#### `listFileTrash`

List a project's trashed files and folders, restorable until permanently deleted
Returns all soft-deleted files and folders currently in the project's file trash. Items remain in trash until they are restored or permanently deleted. Each item includes its original metadata and the date it was trashed, newest first.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `type` | `string` | No |
| `mimeType` | `string` | No |
| `parentId` | `string` | No |
| `deletedBy` | `string` | No |
| `deletedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.listFileTrash({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `saveFile`

Save a file from text or image content
Saves a file to the project from raw text content (Markdown, Mermaid, CSV, JSON, YAML, plain text, etc.) or base64-encoded binary data — images (PNG, JPG, GIF, WebP, SVG) and documents alike (PDF, Word, Excel), with document text extracted and embedded exactly as a console upload would. Text goes in content and binary goes in base64Content; mimeType is inferred from the filename extension when it is not given, and the API accepts up to 20MB. grounding decides how the project's AI may use the file: 'fact', the default, is authoritative content that may be cited verbatim, and 'context' is background that shapes generated copy without being quoted. A 'context' file is always public — sending grounding 'context' with isPublic false coerces isPublic to true. This is the whole path for putting a file into a project over a tool: there is no signed-URL or multi-step variant, because that one needs direct network access to cloud storage. The file is stored in the project and processed for AI embeddings (text) or image classification (images). Accepts documents, notes, diagrams, structured data and screenshots.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.saveFile({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `listFiles`

List a project's files, with search, filtering and sorting
Returns a paginated list of files (images, documents, media) uploaded to the project file manager. Search matches filename, original filename, title and description. Filter with folderId (folderId_isnull=true for the project root), mimeType (mimeType_like=image/ for every image), isPublic and grounding.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `isPublic` | `string` | No |
| `grounding` | `string` | No |
| `mimeType` | `string` | No |
| `folderId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.listFiles({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Legal Documents

`gc.projectLegalDocuments` — Publish a draft project legal document, Get a project legal document by ID, Update a draft project legal document, and more.

#### `publishProjectLegalDocument`

Publish a draft project legal document
Publishes a draft legal document, making it immutable. Every locale listed in the project's enabled_locales must have non-empty content, otherwise the publish is rejected. A published document can never be edited or deleted, because core.user_legal_acceptances records who agreed to what and points at that exact row: editing it would make those records describe something nobody agreed to, and deleting it would take the consent records with it. Publishing a new version of a type leaves the previous one in place as the proof of what earlier users accepted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `documentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.publishProjectLegalDocument({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  documentId: "uuid-documentId",
});
```

---

#### `getProjectLegalDocument`

Get a project legal document by ID
Returns a single legal document version for the project, including its localized content map and publish status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `documentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.getProjectLegalDocument({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  documentId: "uuid-documentId",
});
```

---

#### `updateProjectLegalDocument`

Update a draft project legal document
Updates the localized content of a draft legal document, keyed by locale code. It works only while the document is a draft: a published one is permanent and the database refuses to change it, because the records of who accepted it point at that exact row and would otherwise describe something those people never agreed to. There is no delete for these documents, so correcting a draft in place is the only way to fix a mistake before it goes live, and a published mistake is superseded by a new version rather than edited.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `documentId` | `string` | Yes |
| `data` | `{
    content?: Record<string, unknown>;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.updateProjectLegalDocument({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  documentId: "uuid-documentId",
  data: { /* ... */ },
});
```

---

#### `listProjectLegalDocuments`

List a project's legal document versions across all types, draft and published
Returns a paginated list of legal document versions for the project, including drafts and published versions across all document types (terms of service, privacy policy, acceptable use policy, cookie policy, custom).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `type` | `string` | No |
| `status` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.listProjectLegalDocuments({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `createProjectLegalDocument`

Create a new draft project legal document
Creates a new draft legal document for the project with auto-incremented version per (project, type). type is one of tos, privacy, aup, cookie or custom. Content is a record keyed by locale code, and every locale the project has enabled must hold non-empty content before the document can be published. A published legal document can never be edited or deleted, because the record of who accepted it points at that exact row.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.projectLegalDocuments.createProjectLegalDocument({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Project Members

`gc.projectMembers` — Get a project member by ID, List users added to a project with their roles, and more.

#### `getProjectMember`

Get a project member by ID
Retrieves the full details of a single project member by their membership ID, including their user profile information, assigned role, and membership metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectMembers.getProjectMember({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  memberId: "uuid-memberId",
});
```

---

#### `listProjectMembers`

List users added to a project with their roles
Returns a paginated list of users who are members of the specified project, including their roles and profile information. Supports search by name, filtering, and sorting. Project members have access to project resources based on their assigned role.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `role` | `string` | No |
| `title` | `string` | No |
| `userId` | `string` | No |
| `joinedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectMembers.listProjectMembers({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Trash

`gc.projectTrash` — Restore a trash batch, Restore a deleted entity from the project trash, Get one trashed item's entity type, deletion metadata and stored data snapshot, and more.

#### `restoreProjectTrashBatch`

Restore a trash batch
Restores every trash entry that shares a batch id back to its original location. Batches are created when a single user action trashed multiple rows — for example, deleting a folder places the folder, its files, and its subfolders into the same batch. Folders are restored before files so parent-child foreign keys hold.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `batchId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.restoreProjectTrashBatch({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  batchId: "uuid-batchId",
});
```

---

#### `restoreProjectTrashItem`

Restore a deleted entity from the project trash
Restores a soft-deleted entity from the project trash back to its original location. Dynamically rebuilds the database INSERT from the stored JSONB entity snapshot. Returns the restored entity type, entity ID, and associated app ID.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `trashId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.restoreProjectTrashItem({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  trashId: "uuid-trashId",
});
```

---

#### `getProjectTrashItem`

Get one trashed item's entity type, deletion metadata and stored data snapshot
Retrieves the full details of a single item in the project trash by its trash record ID. Includes the original entity type, entity ID, name, deletion timestamp, and the stored entity data snapshot.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `trashId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.getProjectTrashItem({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  trashId: "uuid-trashId",
});
```

---

#### `permanentDeleteProjectTrashItem`

Permanently delete an entity from the project trash
Permanently and irreversibly removes an item from the project trash. For media/file items, also deletes the associated file from cloud storage. This operation cannot be undone. The item will no longer be recoverable after this action.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `trashId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.projectTrash.permanentDeleteProjectTrashItem({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  trashId: "uuid-trashId",
});
```

---

#### `listProjectTrash`

List soft-deleted items across a whole project, filterable by entity type
Returns a paginated list of all soft-deleted resources across the entire project, including pages, posts, files, forms, and other entities. Supports filtering by entity type to narrow results. Each trash item includes the original entity metadata, deletion timestamp, and the user who deleted it. This is the unified project-level trash, which is a separate place from the file trash.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `entityType` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.listProjectTrash({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `emptyProjectTrash`

Empty all items from trash
Permanently and irreversibly deletes every item in the project trash — every page, post, form, file and app anyone in the project has deleted, rather than one of them, including entries someone else trashed and may have meant to restore. For media/file items, also removes the associated files from cloud storage. This operation cannot be undone. Returns the count of permanently deleted items.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<{
    deletedCount: number;
  }>`

```typescript
const result = await gc.projectTrash.emptyProjectTrash({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
});
```


---

### Project Workflows

`gc.projectWorkflows`

#### `getWorkflowRun`

Get a workflow run and its tasks
| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `runId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectWorkflows.getWorkflowRun({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  runId: "uuid-runId",
});
```

---

#### `dismissWorkflowRun`

Dismiss a workflow run
Soft-hide a run from the default list view. The run itself is preserved for audit and can still be fetched by ID or listed with includeDismissed=true.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `runId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
  }>`

```typescript
const result = await gc.projectWorkflows.dismissWorkflowRun({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  runId: "uuid-runId",
});
```

---

#### `listWorkflowRuns`

List workflow runs
Returns a paginated list of workflow runs for the project. Filter by status (pending/running/succeeded/failed/cancelled) or workflow type. Dismissed runs are hidden by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `type` | `string` | No |
| `createdAt` | `string` | No |
| `startedAt` | `string` | No |
| `completedAt` | `string` | No |
| `includeDismissed` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectWorkflows.listWorkflowRuns({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `createWorkflowRun`

Start a workflow run
Persists a new run of the given workflow type and enqueues its root tasks (tasks with no dependencies). The orchestrator will pick them up on its next tick.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.projectWorkflows.createWorkflowRun({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Projects

`gc.projects` — Get one project from its URL slug, same object as the by-ID lookup, Search project material by meaning, not literal text; returns ranked cited excerpts, List resolved paths for all published content, for building links and menus, and more.

#### `getProjectBySlug`

Get one project from its URL slug, same object as the by-ID lookup
Retrieves the full details of a single project by its URL-friendly slug within the specified organization. This is an alternative to looking up a project by its UUID when you have the human-readable slug from a URL or user input. Returns the same complete project object as the get-by-ID endpoint including name, slug, description, settings, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectSlug` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProjectBySlug({
  organizationId: "uuid-organizationId",
  projectSlug: "my-project",
});
```

---

#### `searchSources`

Search project material by meaning, not literal text; returns ranked cited excerpts
Semantic search across all project knowledge — files, pages, posts, KB articles, developer docs, SDK methods, emails, and private CRM data. Returns the most relevant text chunks ranked by similarity, with sourceType and sourceId citations.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `sourceType` | `string` | No |
| `sourceId` | `string` | No |
| `similarity` | `string` | No |
| `query` | `string` | Yes |
| `limit` | `string` | No |
| `sourceTypes` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.searchSources({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
  query: "search term",
});
```

---

#### `listProjectUrls`

List resolved paths for all published content, for building links and menus
Returns resolved relative URLs for all published content across all apps in the project. Includes pages, posts, articles, etc. with name, path, type, and SEO metadata. Filter by app or type, search by name or path, and sort by any of them. Used for link resolution in AI builders, menus, emails, and navigation.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `app` | `string` | No |
| `type` | `string` | No |
| `id` | `string` | No |
| `path` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.listProjectUrls({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `getProject`

Get one project's name, slug, description and settings within an organization
Retrieves the full details of a single project by its unique ID within the specified organization. Returns the project's name, slug, description, settings, and timestamps. The project must belong to the specified organization or a 404 error is returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProject({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
});
```

---

#### `listProjects`

List projects in an organization; the IDs every project-level tool needs
Returns a paginated list of all projects belonging to the specified organization. Projects are the top-level containers that hold apps, brandings, and domains. Supports search filtering by project name and pagination via page and pageSize query parameters. Each project in the response includes its unique ID, name, slug, description, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `slug` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.listProjects({
  organizationId: "uuid-organizationId",
  page: 1,
});
```


---

### Website

`gc.website` — Ask the search engines to recrawl a page, post, article or doc now, Get the one seeded blog archive page, Update the blog archive page's name and SEO fields; cannot publish or edit content, and more.

#### `submitContentToSearchEngines`

Ask the search engines to recrawl a page, post, article or doc now
Submits a content item's public URL to the search engines that accept instant-indexing submissions, and nudges the rest to re-fetch the sitemap. Publishing or editing content already submits automatically. A separate submission matters when the page was edited outside the platform's knowledge, when a domain was verified after the content went live, or when an earlier submission failed. Only web-facing content has a URL to submit: pages, posts, KB articles, developer docs and the landings. Headers, footers, layouts and forms are not submittable because they have no URL of their own, even though editing one changes what a page renders. Drafts are not submitted either. Submissions coalesce: repeated calls for the same URL inside a five-minute window collapse into one. A response of submitted: false is not an error — it means the item has no public URL to submit, most often because it is a draft or the project has no verified custom domain.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    submitted: boolean;
    reason?: string;
  }>`

```typescript
const result = await gc.website.submitContentToSearchEngines({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteBlogPage`

Get the one seeded blog archive page
Returns the app-level website blog archive page rendered at the site's blog root. There is exactly one per app and the first read seeds it, so it can be edited but never created or deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteBlogPage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `updateWebsiteBlogPageMeta`

Update the blog archive page's name and SEO fields; cannot publish or edit content
Updates the fields that describe the website blog archive page rather than govern it: its internal name, and SEO title, description, image and noindex. Only the fields you send are changed. The archive is the app's blog-root singleton, so it has no slug. Can rebind the layout, header and footer. Cannot change the archive's content or visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsiteBlogPageMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteConsentSettings`

Get the cookie banner copy, category toggles and policy links
Returns the cookie consent and privacy settings configured for this website app, including banner text, consent categories, and GDPR/CCPA compliance options.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteConsentSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteDialog`

Get one dialog with its full block tree, max width and close control
Returns a single website dialog by ID, including its name, type, trigger rules, content blocks, and display settings.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `dialogId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteDialog({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  dialogId: "uuid-dialogId",
});
```

---

#### `deleteWebsiteDialog`

Delete dialog
Moves a website dialog to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `dialogId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsiteDialog({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  dialogId: "uuid-dialogId",
});
```

---

#### `listWebsiteDialogs`

List popup dialogs (modals, banners, slide-ins) in a site, newest first
Returns a list of all popup dialogs configured for this website app. Dialogs are used for modals, popups, banners, and slide-ins.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `maxWidth` | `string` | No |
| `includeClose` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteDialogs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsiteDialog`

Create a popup dialog; nothing shows it until a button links dialog:{id}
Creates a new popup dialog for this website app. A dialog does not appear on its own: it opens from a button or link whose gcUrl is set to 'dialog:{dialogId}', using the id this call returns. maxWidth sizes it and includeClose adds a close control.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsiteDialog({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteCustomDomain`

Get one domain with its verification token, verified state and primary flag
Returns a single custom domain by ID, including hostname, verification status, SSL status, DNS records needed, and primary flag.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `domainId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteCustomDomain({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  domainId: "uuid-domainId",
});
```

---

#### `listWebsiteCustomDomains`

List a site's custom domains, primary first, with verified state and verification token
Returns a list of all custom domains configured for this website app, including verification status, SSL status, and whether each is the primary domain. The primary domain comes first unless a sort is requested, over domain, isPrimary, isVerified, isGenerated, createdAt or updatedAt.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `isPrimary` | `string` | No |
| `isVerified` | `string` | No |
| `isGenerated` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteCustomDomains({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getWebsiteFooter`

Get one footer with its full block tree
Returns a single website footer by ID, including its name, content blocks, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `footerId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  footerId: "uuid-footerId",
});
```

---

#### `deleteWebsiteFooter`

Delete website footer
Moves a website footer component to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `footerId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsiteFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  footerId: "uuid-footerId",
});
```

---

#### `listWebsiteFooters`

List a site's footers newest first, each with its block tree unless lite
Returns a list of all footer components for this website app. Footers are reusable layout sections displayed at the bottom of pages.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteFooters({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsiteFooter`

Create a reusable footer shell; pages attach it by id, content optional
Creates a new footer component for this website app.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsiteFooter({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteHeader`

Get one header with its full block tree
Returns a single website header by ID, including its name, content blocks, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `headerId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  headerId: "uuid-headerId",
});
```

---

#### `deleteWebsiteHeader`

Delete website header
Moves a website header component to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `headerId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsiteHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  headerId: "uuid-headerId",
});
```

---

#### `listWebsiteHeaders`

List a site's headers newest first, each with its block tree unless lite
Returns a list of all header components for this website app. Headers are reusable navigation/branding sections displayed at the top of pages.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteHeaders({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsiteHeader`

Create a reusable header shell; pages attach it by id, content optional
Creates a new header component for this website app.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsiteHeader({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteLanding`

Get the one seeded page at the site root
Returns the app-level website landing page rendered at the website root. There is exactly one per app and it is always seeded, so it can be edited but never created or deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteLanding({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `updateWebsiteLandingMeta`

Update the landing page's name and SEO fields; cannot publish or edit content
Updates the fields that describe the website landing page rather than govern it: its internal name, and SEO title, description, image and noindex. Only the fields you send are changed. A landing is the app's root singleton, so it has no slug and no title. Can rebind the layout, header and footer. Cannot change the landing's content or visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsiteLandingMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteLayout`

Get one layout with its full block tree
Returns a single website layout by ID, including its name, content blocks, layout structure, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `layoutId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteLayout({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  layoutId: "uuid-layoutId",
});
```

---

#### `deleteWebsiteLayout`

Delete website layout
Moves a website page layout to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `layoutId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsiteLayout({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  layoutId: "uuid-layoutId",
});
```

---

#### `listWebsiteLayouts`

List page layouts available when creating a page, newest first
Returns a list of all page layouts for this website app. Layouts provide reusable page layouts and content block structures.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteLayouts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsiteLayout`

Create a layout shell; pages set layoutId to share its block tree
Creates a new page layout for this website app. A layout pairs a header with a footer (headerId, footerId) so pages and posts can share one shell, applied by setting layoutId on the page or post.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsiteLayout({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteNotFoundPage`

Get the one seeded not found page
Returns the app-level website not found page, rendered on any unresolved path. There is exactly one per app and it is always seeded, so it can be edited but never created or deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteNotFoundPage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `updateWebsiteNotFoundPageMeta`

Update the not found page's name and SEO fields; cannot publish or edit content
Updates the fields that describe the website not found page rather than govern it: its internal name, and SEO title, description, image and noindex. Only the fields you send are changed. The 404 is the app's not-found singleton, so it has no slug. Can rebind the layout, header and footer. Cannot change the page's content or visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsiteNotFoundPageMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsitePage`

Get one page with its full block tree, SEO, status and layout ids
Returns a single website page by ID, including title, slug, full content blocks, SEO metadata, publish status, and layout references (header, footer, sidebar).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `pageId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsitePage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  pageId: "uuid-pageId",
});
```

---

#### `deleteWebsitePage`

Delete website page
Soft-deletes a website page by moving it to the project trash. Can be restored from trash later.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `pageId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsitePage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  pageId: "uuid-pageId",
});
```

---

#### `updateWebsitePageMeta`

Update a page's name, title, slug, SEO fields, featured image and tags; cannot publish or edit content
Updates the fields that describe a page rather than govern it: SEO title, description, image, noindex, featured image, and tags. Only the fields you send are changed. featuredImageUrl and seo.image take a file reference (file:{uuid}) rather than a resolved URL, which keeps the image tracked as in-use so it cannot be deleted out from under the page. Can rebind the layout, header and footer. Cannot change the page's content, status or visibility.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `pageId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsitePageMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  pageId: "uuid-pageId",
  data: { /* ... */ },
});
```

---

#### `listWebsitePages`

List a site's pages with slug, live URL and publish status, newest first
Returns a list of all pages for this website app. Each page includes its title, slug, publish status, SEO metadata, and associated header/footer/sidebar references.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `slug` | `string` | No |
| `isListed` | `string` | No |
| `layoutId` | `string` | No |
| `headerId` | `string` | No |
| `footerId` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsitePages({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsitePage`

Create a page shell; content optional and status defaults to published, live immediately
Creates a new website page. name and slug are both required: name is the page title, and the slug is the URL segment, which must be unique within the app or the call fails with a 409. layoutId attaches a layout, which is how a page gets a header and footer. Content blocks, SEO metadata, and header, footer and sidebar references are optional.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsitePage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsitePost`

Get one blog post with its full content blocks, tags and SEO fields
Returns a single blog post by ID, including title, slug, full content blocks, excerpt, tags, author, featured image, SEO metadata, and publish status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `postId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsitePost({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  postId: "uuid-postId",
});
```

---

#### `deleteWebsitePost`

Delete blog post
Soft-deletes a blog post by moving it to the project trash. Can be restored from trash later.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `postId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsitePost({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  postId: "uuid-postId",
});
```

---

#### `updateWebsitePostMeta`

Update a post's name, title, slug, excerpt, author, publish date, tags and SEO, not its content
Updates the fields that describe a post rather than govern it: its internal name, public title and slug, SEO title and description, excerpt, author name, publish date, tags and featured image. Only the fields you send are changed. featuredImageUrl and seo.image take a file reference (file:{uuid}) rather than a resolved URL, which keeps the image tracked as in-use so it cannot be deleted out from under the post. Renaming the slug moves the public URL and records a redirect from the old path automatically. Can rebind the layout, header and footer. Cannot change the post's content or status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `postId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsitePostMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  postId: "uuid-postId",
  data: { /* ... */ },
});
```

---

#### `listWebsitePosts`

List blog posts in a site, newest first, with author, tags and status
Returns a paginated list of all blog posts for this website app. Each post includes title, slug, excerpt, publish status, author, tags, and featured image.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `slug` | `string` | No |
| `isListed` | `string` | No |
| `authorId` | `string` | No |
| `authorName` | `string` | No |
| `publishDate` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsitePosts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsitePost`

Create a blog post; status defaults to draft
Creates a new blog post. name and slug are both required: name is the title, and the slug is the URL segment, which must be unique within the app or the call fails with a 409. status defaults to draft. featuredImageUrl takes a file reference (file:{uuid}) rather than a resolved URL, which keeps the image tracked as in-use so it cannot be deleted out from under the post, and publishDate is what the blog orders by. layoutId, headerId and footerId bind the shell the post renders inside, and omitting them inherits the app default. Content blocks, excerpt, tags, author name, featured image, publish date and SEO metadata are all optional here.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsitePost({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteRedirect`

Get one website URL redirect by id
Returns a single URL redirect by ID, including its fromPath, toPath, status and source.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `redirectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteRedirect({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  redirectId: "uuid-redirectId",
});
```

---

#### `listWebsiteRedirects`

List a site's URL redirects, newest first, with from, to, status and source
Returns a paginated list of the URL redirects for this website app. Each maps an old path (fromPath) to the current path (toPath) with a status (301 or 308) and a source: auto (recorded when a slug changed) or manual (added by hand).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `source` | `string` | No |
| `status` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteRedirects({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getWebsiteSidebar`

Get one sidebar with its full block tree
Returns a single website sidebar by ID, including its name, content blocks, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `sidebarId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteSidebar({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  sidebarId: "uuid-sidebarId",
});
```

---

#### `deleteWebsiteSidebar`

Delete website sidebar
Moves a website sidebar component to the project trash. It stops being served at once and can be restored from the trash afterwards, so this is recoverable rather than permanent.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `sidebarId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.website.deleteWebsiteSidebar({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  sidebarId: "uuid-sidebarId",
});
```

---

#### `listWebsiteSidebars`

List a site's sidebars newest first, each with its block tree unless lite
Returns a list of all sidebar components for this website app. Sidebars are reusable layout sections displayed alongside page content.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `name` | `string` | No |
| `createdAt` | `string` | No |
| `updatedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteSidebars({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createWebsiteSidebar`

Create a reusable sidebar shell; a layoutSidebar block points at it by id
Creates a new sidebar component for this website app. A sidebar is a shared component, created once and referenced rather than rebuilt per page.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.website.createWebsiteSidebar({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `getWebsiteSignInPage`

Get the one seeded sign-in page
Returns the app-level website sign-in page, served at the site's fixed sign-in path. There is exactly one per app and it is always seeded, so it can be edited but never created or deleted. What makes it a sign-in page is a block scoped to this content type rather than a special rendering path, so it is authored like any other page. It has no slug, because its address is fixed, and no visibility flag, because a sign-in page that is not public is a locked door with the key inside.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteSignInPage({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `updateWebsiteSignInPageMeta`

Update the sign-in page's name and SEO fields; cannot publish or edit content
Updates the fields that describe the website sign-in page rather than govern it: its internal name, and SEO title, description, image and noindex. Only the fields you send are changed. The sign-in page is the app's singleton, so it has no slug, and it carries no visibility flag. Can rebind the layout, header and footer. Cannot change the page's content.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |
| `draftId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.updateWebsiteSignInPageMeta({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

---

#### `listWebsiteTags`

List the tag names in use across a site's pages and posts
Returns a list of all tags used across pages and posts in this website app. Tags are used for categorization and filtering.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `tag` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteTags({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getWebsiteTrackingSettings`

Get the site's tag manager container ID, the only tracking setting
Returns the tracking configuration for this website app, including its tag manager container ID.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteTrackingSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteUrls`

Get existing page slugs and each page's layout, to avoid duplicate slugs
Returns existing page slugs (to avoid duplicate URLs) and per-page entries with the layout each page uses (the builder's peer-usage signal for layout selection).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteUrls({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteViewerApple`

Whether this site's readers can sign in with Apple
Reads the site's viewer tenant in Identity Platform rather than our own settings, so a provider removed out of band shows as absent instead of as offered. Also answers whether the platform has an Apple configuration to offer at all, which is the difference between a site that has said no and a site that cannot say yes.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<{
    offered: boolean;
    available: boolean;
  }>`

```typescript
const result = await gc.website.getWebsiteViewerApple({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteViewerAuth`

Whether this site's private pages have members, and which tenant
Returns whether viewer sign-in is enabled for this website app and the identity tenant holding its viewers. The tenant id is not a secret — it is compared against a session's claim, never used to mint one.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteViewerAuth({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteViewerSso`

The identity providers this site's readers can sign in with
Returns the SAML and OIDC providers configured on this site's viewer tenant, read from Identity Platform rather than from our own settings, so a stored pointer that no longer resolves shows up as absent instead of as configured. No secret is returned: a customer's client secret is held by Identity Platform and cannot be read back.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteViewerSso({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `removeWebsiteViewer`

Remove somebody's access to this website's gated content
Deletes the member's account in the site's identity tenant and the record that they hold one. The person stays: they may be a contact, a subscriber or a lead, and removing them from a site's members says nothing about any of that — erasure is a separate request with its own runner. It does not end a live session: a session cookie is a signed token the edge verifies on its own and never checks against the provider, so somebody already signed in keeps reading until their token expires, within the hour. Re-inviting the same address afterwards creates a new account rather than restoring this one.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `uid` | `string` | Yes |

**Returns:** `Promise<{
    uid: string;
  }>`

```typescript
const result = await gc.website.removeWebsiteViewer({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  uid: "value",
});
```

---

#### `listWebsiteViewers`

List the people who can read this website's gated content
Returns the site's members — the viewers who can read pages and posts marked as requiring sign-in. Each row is a person: personId points at the same record the CRM, segments and activity use, so a reader can be a contact rather than an account stranded in the identity provider. hasSignedIn is false for somebody who has been invited but has not followed the link yet, and signedInAt is null for exactly those, so filtering it separates outstanding invitations from arrived members. lastActivityAt is the person's last activity anywhere in the project rather than their last visit to this site. A site with viewer sign-in switched off returns an empty list rather than an error. A viewer exists for this one site: they hold no console access and no permissions, and cannot be an organization or project member.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `signedInAt` | `string` | No |
| `invitedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteViewers({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `inviteWebsiteViewer`

Invite somebody to read this website's gated content
Creates an account in the site's identity tenant and emails a sign-in link. No password is set; the link signs them in once, and the identity provider owns its expiry. Inviting somebody who already has an account sends a fresh link rather than failing, which is how an expired invitation is repaired. Invited people can read every gated page on this site and nothing else — there are no viewer roles, and they are not Giant Context users and hold no permissions. The link lives on the order of an hour. The address becomes a person at once and the response carries its personId, so an invited reader is a contact before their first sign-in rather than after it. Refuses with VIEWER_AUTH_DISABLED when the site has no viewer sign-in, and with VIEWER_ERASED when that address has asked to be forgotten.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `{
    email: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.inviteWebsiteViewer({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```

<!-- API_REFERENCE_END -->

## Requirements

- Node.js 18+
- TypeScript 4.9+ (optional but recommended)

## License

MIT
