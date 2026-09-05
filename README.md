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
223 methods across 31 resources.

- [API Keys](#api-keys) (2)
- [App Members](#app-members) (2)
- [Briefs](#briefs) (4)
- [Bug Reports](#bug-reports) (2)
- [Builder](#builder) (15)
- [CRM](#crm) (15)
- [Chat](#chat) (2)
- [Content Versions](#content-versions) (3)
- [Developers](#developers) (14)
- [Drafts](#drafts) (8)
- [Email](#email) (22)
- [Feature Requests](#feature-requests) (3)
- [Forms](#forms) (6)
- [Health](#health) (1)
- [Ideas](#ideas) (5)
- [Invitations](#invitations) (2)
- [KB](#kb) (13)
- [Me](#me) (6)
- [Notifications](#notifications) (1)
- [Organization Members](#organization-members) (5)
- [Organizations](#organizations) (4)
- [Project Apps](#project-apps) (6)
- [Project Branding](#project-branding) (2)
- [Project Domains](#project-domains) (2)
- [Project Files](#project-files) (15)
- [Project Legal Documents](#project-legal-documents) (5)
- [Project Members](#project-members) (2)
- [Project Trash](#project-trash) (6)
- [Project Workflows](#project-workflows) (4)
- [Projects](#projects) (5)
- [Website](#website) (41)

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

### Briefs

`gc.briefs` — Approve a ready brief, which starts draft generation from its draft prompt, Reject a ready brief so it never reaches draft generation, Get one brief's full paper trail from idea to draft prompt, and more.

#### `approveBrief`

Approve a ready brief, which starts draft generation from its draft prompt
Approves a ready Mind brief and starts draft generation from the brief's canonical draft prompt. The brief must be in 'ready' status.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `briefId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.briefs.approveBrief({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  briefId: "uuid-briefId",
});
```

---

#### `rejectBrief`

Reject a ready brief so it never reaches draft generation
Rejects a ready Mind brief so it cannot be used to generate a draft.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `briefId` | `string` | Yes |
| `data` | `{
    reason?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.briefs.rejectBrief({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  briefId: "uuid-briefId",
  data: { /* ... */ },
});
```

---

#### `getBrief`

Get one brief's full paper trail from idea to draft prompt
Returns full details of a Mind brief, including stream selection, discovery, plan, design, audit, retry history, and draft prompt/spec artifacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `briefId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.briefs.getBrief({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  briefId: "uuid-briefId",
});
```

---

#### `listBriefs`

List Mind briefs for a project
Returns a paginated list of Mind briefs for the project. Briefs are the prepared bridge between ideas and generated drafts, including stream, planning, audit, and draft prompt artifacts.

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
const result = await gc.briefs.listBriefs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
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

`gc.builder` — Get every content type and the blocks allowed in it, Get the styles schema shared by every block, Get one block type's own fields and hints; shared styles come from getBlockStyles, and more.

#### `getContentTypes`

Get every content type and the blocks allowed in it
Lists every content type you can create or edit — website pages, posts, landings, headers, footers, sidebars, dialogs and layouts; kb articles and landings; developer docs and landings; forms; emails and their headers and footers — with the builder context each belongs to and the exact block types allowed inside it. Use it to answer 'what can I put in this?' before building. The reverse lookup, 'where can I use this block?', is the contexts field on listBuilderBlocks.

**Returns:** `Promise<object>`

```typescript
const result = await gc.builder.getContentTypes();
```

---

#### `getBlockStyles`

Get the styles schema shared by every block
Returns the one styles object every block, column and section accepts — margin, padding, width, background, border, box shadow, position, per-breakpoint visibility, entrance animation and cssId/cssClasses. It is identical for every block type, so call this once and reuse it. getBlock omits styles and refers here rather than repeating them on every block. The schema carries its own value-format guidance: which fields take per-breakpoint objects, when a bare number means a theme spacing multiple rather than pixels, and exactly which colour tokens resolve.

**Returns:** `Promise<{
    styles: unknown;
  }>`

```typescript
const result = await gc.builder.getBlockStyles();
```

---

#### `getBlock`

Get one block type's own fields and hints; shared styles come from getBlockStyles
Returns the JSON schema for a single block type plus its per-field authoring hints, scoped to (and validated against) the content type's palette. The styles object is identical for every block and is served by getBlockStyles instead of being repeated here. Follow this exactly when building block data for insertBlock/updateBlock.

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
Removes a section (and its blocks) from a content tree and records a version. Returns the removed section. The prior state is recoverable via restoreContentVersion.

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
Inserts a new section (validated against the section schema, including any blocks it carries) and records a version. Every field on the supplied section is kept; only id and type are server-owned. Ids are generated for the section and for any columns/blocks that omit one. Omit an anchor to append at the end.

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
Patches a section's own properties and records a version. Any section field may be patched; id, type and columns are refused with an error rather than ignored. Does not touch its blocks — use the block tools for those.

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
Removes a block from a content tree and records a version. Returns the removed block, plus columnRemoved or sectionRemoved when deleting the block emptied its container: an empty column is pruned (it renders a gap) and, when that empties the whole section, the section is pruned too (it paints an orphan background band). Non-destructive at the history level — the prior state is recoverable via restoreContentVersion.

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
Merges the supplied fields into a block's data and/or its styles and records a version. Send data, styles, or both; fields you omit keep their current value; send null to clear one. Styles cover padding, margins, borders, background, alignment and hideOnMobile — previously settable only at insertBlock, now editable here. Locale maps merge per locale, so writing one language leaves the others intact. Validated against the block type's schema.

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

#### `unpublishContent`

Return a published item to draft — status only, never the body
Sets a content item's status back to draft, taking it off the public site while leaving its content, slug and metadata intact so it can be published again unchanged. The first-published date is kept, not cleared. Unpublishing tells the search engines the URL is gone and purges the public cache, so a page removed this way stops being served rather than lingering in a cache or an index.

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
Sets a content item's status to published and leaves everything else untouched: not its content, slug, layout or metadata. Works for every content type that has a draft/published lifecycle — website pages and posts, KB articles, developer docs and emails. Structural pieces (headers, footers, layouts, landings, forms) are always live and are refused by name. Publishing re-indexes the item for AI search, signals the search engines, and purges the public cache. Re-publishing something already published is not an error; the response says alreadyInState. Pass publishAt with a future timestamp to schedule instead of publishing: the item stays a draft until a job takes it live, and the response returns scheduledPublishAt with status still draft.

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
Search the content of pages, posts, KB articles and developer docs in a project — by exact case-insensitive string (query), by block type (blockTypes), or both. A text query also searches each section's heading and subheading, not just block copy. Filter by content type and by draft/published status. Every match reports its full location — contentId (canonical type), sectionId, columnId and blockId — plus matchIn (block, heading or subheading), so a hit feeds straight into a structural op (deleteSection, moveBlock, updateBlock, updateSection) with no tree read. The field path, locale and snippet are populated for a text query and null for a pure block-type match. Use searchSources instead when looking for material by meaning rather than by exact wording or structure.

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
Returns the full Section[] content tree (with every section/column/block id) for a content entity — pages, posts, landings, etc. Fetch this before granular edits so you have the ids to target.

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
Appends an activity to the CRM timeline. `description` is a natural-language sentence ('Viewed pricing page', 'Unsubscribed from newsletter'). `writtenBy` identifies which app wrote it. Optional `data` carries structured metadata for agents to read. Link to a contact and/or company via id.

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
| `email` | `string` | No |
| `emailSubscribed` | `string` | No |

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

#### `listCrmContactActivities`

List a contact's activity timeline, newest first, including rows written by other apps
Returns the natural-language activity timeline for a contact, newest first. Each row is a description of something that happened, tagged with the app that wrote it, with optional JSON metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `writtenBy` | `string` | No |
| `companyId` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmContactActivities({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
  page: 1,
});
```

---

#### `setCrmContactField`

Set one key in a contact's custom properties, merging without clobbering siblings
Sets a single key on a contact's custom `properties`. Merges at the key level — siblings are preserved. Use this instead of PUT /contacts when only one field needs to change, especially from other apps.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |
| `data` | `{
    key: string;
    value: unknown;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.setCrmContactField({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
  data: { /* ... */ },
});
```

---

#### `getCrmContact`

Get one contact with all fields, tags and its linked company
Returns a single CRM contact by ID, including linked company details. Fields include name, email, phone, title, department, status, source, tags, email subscription status, and last activity timestamp.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmContact({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
});
```

---

#### `updateCrmContact`

Update contact
Updates a CRM contact. All fields are optional — only provided fields are updated. Returns 409 if email or phone conflicts with an existing contact.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.updateCrmContact({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
  data: { /* ... */ },
});
```

---

#### `tagCrmContact`

Tag one contact with a single free-form string, idempotent, returns the contact
Adds a tag to a contact. Tags are free-form strings used for segmenting, gating marketing messages, and ad-hoc grouping. Idempotent — adding an existing tag is a no-op.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |
| `data` | `{
    tag: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.tagCrmContact({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
  data: { /* ... */ },
});
```

---

#### `untagCrmContact`

Untag one contact, one tag per call, idempotent, returns the updated contact
Removes a tag from a contact. Idempotent — removing a tag the contact doesn't have is a no-op.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |
| `data` | `{
    tag: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.untagCrmContact({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
  data: { /* ... */ },
});
```

---

#### `listCrmContacts`

List contacts in one CRM app, alphabetical by last name, search supported
Returns a paginated list of all CRM contacts for the specified app. Supports search by first name, last name, or email. Each contact includes associated company info if linked.

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
| `companyId` | `string` | No |
| `status` | `string` | No |
| `source` | `string` | No |
| `title` | `string` | No |
| `department` | `string` | No |
| `email` | `string` | No |
| `emailSubscribed` | `string` | No |
| `locale` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.listCrmContacts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createCrmContact`

Create contact
Creates a new CRM contact. Requires firstName and lastName. Optionally link to a company via companyId. Supports email, phone, title, department, status, source, custom properties, and tags.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.crm.createCrmContact({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  data: { /* ... */ },
});
```


---

### Chat

`gc.chat` — Get chat conversation with paginated messages, List every visitor conversation in a chat app, most recently updated first, and more.

#### `getChatConversation`

Get chat conversation with paginated messages
Retrieve a chat conversation with cursor-based paginated messages. Without a cursor, returns the most recent messages (up to limit). Use direction=older with cursor/cursorId to load history.

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
Returns the newest-first version history for a single content entity (page, post, landing, etc). Metadata only — use getContentVersion for a version's full content snapshot. This is the undo/rollback trail for both human and AI edits.

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

`gc.developers` — Get one category's own fields; its docs come from listDevelopersDocs with categoryId, Delete developer doc category, Update a category's name and description; cannot re-slug or re-parent it, and more.

#### `getDevelopersDocCategory`

Get one category's own fields; its docs come from listDevelopersDocs with categoryId
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

Update a category's name and description; cannot re-slug or re-parent it
Updates a developer docs category's name and the description shown alongside it in navigation and listings. Only the fields you send are changed. A category has no separate title, so name IS the label a reader sees, and it is translatable. Cannot change the category's slug, parent, order or icon — a category slug sits in the public path of every doc beneath it and re-slugging leaves no redirect.

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
Lists all developer docs categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories and sorted by their display order. Includes all active (non-deleted) categories.

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
Creates a new developer docs category in the specified app. Validates slug uniqueness, automatically assigns display order among sibling categories, and supports hierarchical nesting via the parentId field. Categories are used to organize articles within the developer docs.

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
Updates the fields that describe a developer doc rather than govern it: SEO title, description, image, noindex, the excerpt, the featured image and tags. Only the fields you send are changed. Can rebind the page shell — the website app it borrows from, and its layout, header and footer. Cannot change the doc's content, status, visibility, order or category membership — use the block tools for content and publishContent to take it live.

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

List docs in a developer portal, newest first; pass lite=true to skip huge content
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
| `isPublic` | `string` | No |
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

Create a doc; slug must be unique, status defaults to draft, isPublic to true
Creates a new developer doc in the specified app. Validates slug uniqueness, automatically assigns display order, and optionally associates the article with categories. If the article is created with 'published' status and has content, it is automatically ingested into the AI developer docs for search and retrieval.

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
Updates the fields that describe the developer portal landing page rather than govern it: SEO title, description and image. Only the fields you send are changed. Can rebind the page shell — the website app it borrows from, and its layout, header and footer. Cannot change the landing page's content or visibility — use the block tools for content.

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

Get one URL redirect by id
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
Returns recent SDK sync events and last-synced timestamps for both OpenAPI and SDK sync.

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

`gc.drafts` — Unarchive a draft back into the default list; already-unarchived is a no-op, Archive an accepted draft to hide it from the default list without deleting, Generate AI edits to existing content; async, returns a pending draftId to poll, and more.

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
Hides an accepted draft from the default list without deleting it. Archived drafts are preserved as a paper trail and for AI training data. Only accepted or partially_accepted drafts can be archived.

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

Generate AI edits to existing content; async, returns a pending draftId to poll
Generates a reviewable edit draft for an EXISTING resource. The AI analyzes the current content, determines what to keep/modify/add/remove, and stages the edited version as a copy — the live content only changes when the draft is accepted. For brand-new content, use generateNewDraft.

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

Get one draft with its prompt, generated content and status; poll while pending
Retrieves the full details of a single AI-generated content draft including the prompt, generated content, tool calls, and sources. Pass lite=true while polling to get status, qualityScore and errorMessage without the content tree, tool calls or sources.

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
Generates NEW content as a reviewable draft from a natural language prompt. The draft is a proposal — nothing publishes until it is accepted. For changes to existing content, use generateEditDraft.

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
Returns the unified email timeline for a contact: past sends + planned sends (including staged sends from a Mind sends draft when present), each with per-send engagement stats (opens, clicks, bounced, complained). Each send carries its `draftId` (non-null only while staged in a ready draft). The response-level `draftId` points at the contact's active sends draft when one exists — use it to render accept/reject UI. Order is COALESCE(sent_at, scheduled_for, created_at) DESC so upcoming planned sends appear at the top, then recent sent, then older.

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

Update an email's name, slug, subject and send-trigger sentence, not content or status
Updates the fields that describe an email rather than govern it: its internal name and slug, the subject line, and the trigger description saying when the Mind should send it. Only the fields you send are changed. An email is sent rather than served, so its slug is an internal reference and changing it breaks no link. Subject is the reader-facing string; emails have no title. Can rebind the header and footer. Cannot change the email's content or status — use the block tools for content.

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

#### `getEmailRecipient`

Get email recipient
Returns a single recipient row with subscription state.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `recipientId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailRecipient({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  recipientId: "uuid-recipientId",
});
```

---

#### `unsubscribeEmailRecipient`

Unsubscribe a contact from one email; the row is kept for resubscribe
Soft-unsubscribes a recipient by setting unsubscribed_at and an optional reason. The row is preserved for audit + resubscribe.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `recipientId` | `string` | Yes |
| `data` | `{
    reason?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.unsubscribeEmailRecipient({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  recipientId: "uuid-recipientId",
  data: { /* ... */ },
});
```

---

#### `listEmailRecipients`

List one email's subscribers, including past unsubscribes, newest subscription first
Returns the subscribers for a specific email template. Includes currently subscribed and previously unsubscribed contacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `contactId` | `string` | No |
| `subscribedAt` | `string` | No |
| `unsubscribedAt` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.listEmailRecipients({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  page: 1,
});
```

---

#### `subscribeEmailRecipient`

Subscribe a CRM contact to one email; resubscribes if previously unsubscribed
Adds a contact as a recipient of this email. If the contact was previously unsubscribed, the row is resurrected (unsubscribed_at cleared).

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `data` | `{
    contactId: string;
  }` | Yes |

```typescript
const result = await gc.email.subscribeEmailRecipient({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  data: { /* ... */ },
});
```

---

#### `listEmails`

List emails in an email app, newest first; pass lite=true to skip content
Returns a list of all emails for the specified app. Each email includes its name, subject line, trigger description, content blocks, and associated header/footer references.

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

Get one footer's block content in full; listEmailFooters lite=true returns metadata only
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
Permanently deletes an email footer.

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

List footers in an email app, newest first; pass lite=true to skip content
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
Creates a new email footer with content blocks for branding, unsubscribe links, and legal text.

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

Get one header's full block tree; no lite mode, so expect heavy output
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
Permanently deletes an email header.

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

List headers in an email app, newest first; pass lite=true to skip content
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
Creates a new email header with content blocks for branding and navigation.

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
Creates a send row. Mind writes status='planned' rows that it reorders as new CRM activity lands. When Mind commits to firing, it transitions to status='queued' with scheduled_for set; a worker picks it up.

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

`gc.forms` — Get one form's fields, settings and content blocks in Builder format, Delete form, Update a form's name and description; cannot re-slug it or change fields, and more.

#### `getForm`

Get one form's fields, settings and content blocks in Builder format
Retrieve the full details of a single form by its identifier. Returns the form's unique identifier, associated app identifier, name, URL slug, description, field definitions (each with name, type, and required status), rich content layout (Builder block structure used for rendering), settings (redirect URL, tags, source, success message, submission limit), active/inactive status, and creation and update timestamps. The NOTIFICATION ADDRESS IS NOT HERE — it is one setting for the whole Forms app, not per form: read settings.notifyEmail from getProjectApp for this appId. This description used to promise it on the form, which is how it came to be reported as missing.

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
Updates the fields that describe a form rather than govern it: its internal name, its description, and its settings — the message a visitor sees after submitting, the button label, the submission limit and the CRM tags. Only the fields you send are changed, and settings merge per key, so sending one leaves the rest alone. Cannot change the form's slug, fields, content or active status — use updateBlock and the section tools for content.

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
Retrieve a paginated list of all submissions received for a specific form. Each submission includes its unique identifier, the parent form identifier, the user-submitted data (key-value pairs corresponding to form fields), metadata (user agent, IP address, referer, submission timestamp, tags, source), and the creation timestamp. Supports full-text search across submission data.

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
Retrieve a paginated list of all forms belonging to the specified Forms app. Each form in the response includes its unique identifier, name, URL slug, description, field definitions (name, type, required status), rich content layout, settings (notification email, redirect URL), active/inactive status, creation and update timestamps, and a count of how many submissions have been received. Supports searching forms by name or slug.

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
Sends a prompt to the AI service which calls Gemini to generate a unique message. A successful response with a message confirms the full chain is working: API → AI service → Gemini API. Each call returns a different message, proving the LLM is live.

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

`gc.ideas` — Approve a pending idea to start content generation; a draft may follow automatically, Dismiss a pending idea with an optional reason so Mind stops suggesting it, Get one idea's rationale, outline and similarity score before approving or dismissing, and more.

#### `approveIdea`

Approve a pending idea to start content generation; a draft may follow automatically
Approve an idea, which sets its status to 'approved'. Email sends and focused email edits enqueue durable materialization contracts; other content types trigger draft generation automatically. The idea must be in 'pending' status.

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

Get one idea's rationale, outline and similarity score before approving or dismissing
Returns full details of a Mind idea including title, rationale, outline, priority, similarity score, and status. If the idea has status 'pending', it can be approved (triggering draft generation) or dismissed.

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
Returns a paginated list of Mind ideas for the project. Ideas represent content gaps or suggestions identified by the AI ideation engine. Filter by status to see pending, approved, dismissed, or drafted ideas.

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
Enqueues a durable Mind ideation contract for this project. Optional 'target' narrows execution to one (contentType, operationKey) operation — useful for targeted testing. Returns the run and contract IDs immediately.

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

`gc.invitations` — Get an invitation by ID, List invitations sent by an organization: pending, accepted and expired, with role, and more.

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
Updates the fields that describe a knowledge base article rather than govern it: SEO title, description, image and noindex, plus the excerpt, tags and featured image. Only the fields you send are changed. Can rebind the layout, header and footer. Cannot change the article's content, status, visibility, order or category assignments — use publishContent to take it live.

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

List articles in one KB app, newest first; pass lite=true to omit huge content
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
| `isPublic` | `string` | No |
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
Creates a new knowledge base article in the specified app. Validates slug uniqueness, automatically assigns display order, and optionally associates the article with categories. If the article is created with 'published' status and has content, it is automatically ingested into the AI knowledge base for search and retrieval.

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

Update a category's name and description; cannot re-slug, reorder or re-parent it
Updates a knowledge base category's name and its description, the blurb shown beneath it in listings and on its own page. Only the fields you send are changed. A category has no separate title, so name IS the label a reader sees, and it is translatable. Cannot change the category's slug or icon, reorder it, or move it in the hierarchy — a category slug sits in the public path of every article beneath it and re-slugging leaves no redirect.

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
Lists all knowledge base categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories and sorted by their display order. Includes all active (non-deleted) categories.

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
Creates a new knowledge base category in the specified app. Validates slug uniqueness, automatically assigns display order among sibling categories, and supports hierarchical nesting via the parentId field. Categories are used to organize articles within the knowledge base.

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

Get one URL redirect by id
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
Returns a paginated list of notifications for the authenticated user. Supports filtering by read/unread status and notification type via query parameters. Each notification includes its type, title, message, read status, and associated resource reference.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `sort` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |
| `type` | `string` | No |

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
| `plan` | `string` | No |
| `subscriptionStatus` | `string` | No |
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

Get current user profile and permissions
Returns the authenticated user's full profile including name, email, avatar, role (admin/editor/viewer), active status, notification preferences, suspension status, a list of all granted RBAC permissions, and organization memberships with roles. Auto-provisions new users on first login with a default viewer role.

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMe();
```


---

### Notifications

`gc.notifications` — Send a notification, and more.

#### `sendNotification`

Send a notification
Dispatches a notification to a single user, an email recipient, all members of an organization, or all members of a project. Exactly one recipient field (userId | email | organizationId | projectId) must be supplied. Channels fan out in parallel; failures land in the result counts. Restricted to platform admins.

| Parameter | Type | Required |
|-----------|------|----------|
| `data` | `object` | Yes |

**Returns:** `Promise<{
    delivered: number;
    skipped: number;
    failed: number;
  }>`

```typescript
const result = await gc.notifications.sendNotification({
  data: { /* ... */ },
});
```


---

### Organization Members

`gc.organizationMembers` — List all organization projects with one member's access level, null where none, List every app with one member's role; project roles do not grant app access, Get member activities, and more.

#### `listMemberProjectMemberships`

List all organization projects with one member's access level, null where none
Returns a list of all projects in the organization along with the specified member's access level for each project. Each entry includes the project ID, name, and the member's role/permission level within that project (or null if they have no direct project membership). Useful for auditing a member's project access across the organization.

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

`gc.organizations` — Get a service account, List an organization's service accounts, newest first, Get one organization's name, slug, plan, status and member count by ID, and more.

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

Get one organization's name, slug, plan, status and member count by ID
Retrieves a single organization by its unique ID. Returns the full organization object including name, slug, logo URL, plan, status, member count, and timestamps. Returns 404 if the organization does not exist.

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
Retrieves a single organization by its URL-friendly slug (e.g. 'my-company'). Returns the full organization object including ID, name, slug, logo URL, plan, status, member count, and timestamps. Useful for resolving organizations from URLs or user input where the slug is known but the ID is not. Returns 404 if no organization matches the given slug.

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

### Project Apps

`gc.projectApps` — Get a project app by slug, Read one app's settings, whatever kind of app it is, Change one app's settings, merging into what is already there, and more.

#### `getProjectAppBySlug`

Get a project app by slug
Retrieves the full details of a single app by its URL-friendly slug within the specified project. This is an alternative to looking up an app by ID when you have the human-readable slug instead. Returns the same complete app object as the get-by-ID endpoint including name, slug, app type, configuration, and timestamps.

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
Returns the app's settings object together with the schema describing what that app accepts, so a caller can discover the shape without knowing the app type in advance. The shape comes from the app's own declaration, not from a list maintained here. Answers 404 with NO_APP_SETTINGS for an app type that has no settings, and names the ones that do.

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
Merges the given keys into the app's settings, validating them against the app's own declared schema — an unknown key or a wrong type is a 400 naming the offending key, not a silent write. Only the keys sent are changed; omitted keys keep their value. Send a key as null to clear it.

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
Returns a paginated list of all active (non-deleted) apps configured within the specified project. Apps represent individual applications such as websites, email, forms, knowledge bases, chat widgets, CRM instances, developer docs, or socials. Each app includes its unique ID, name, slug, app type, configuration, and timestamps. Supports pagination and search filtering.

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
Returns a comprehensive list of all domains (both auto-generated and custom) across all apps within the specified project. Each domain entry includes its hostname, verification status, whether it is generated or custom, whether it is the primary domain for its app, and the associated app name and slug. Domains are grouped by app and sorted with generated domains first and primary domains prioritized.

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

### Project Files

`gc.projectFiles` — Restore an item from trash, List places where a file is referenced, Get one folder's name and parent; use listFiles with folderId to see its files, and more.

#### `restoreFileTrashItem`

Restore an item from trash
Restores a previously soft-deleted file or folder from the file trash back to the file manager. For folders, optionally restores all contained files and subfolders. Requires specifying the item type (file or folder) in the request body. Returns counts of restored files and folders for folder-type items.

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
Returns a comprehensive list of all entities that reference this file across the project. This includes pages, headers, footers, blog posts, templates, sidebars, dialogs, forms, and branding settings. Useful for understanding the impact of deleting or replacing a file.

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

Get one folder's name and parent; use listFiles with folderId to see its files
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

Delete a file folder (files are moved to root)
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

Permanently delete an item from trash
Permanently and irreversibly deletes a file or folder from the file trash. For files, also removes the file from cloud storage. For folders, recursively deletes all contained files and subfolders. Requires specifying the item type (file or folder) in the request body.

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
Returns the actual content of a file inline — text as a string, images as base64. Use this when you need to read or analyze a file's content rather than just its metadata. Text files (Markdown, CSV, JSON, YAML, plain text, HTML, CSS, JS, XML, SVG) are returned in the 'content' field. Image files (PNG, JPG, GIF, WebP) are returned as base64 in the 'base64Content' field. Files over 10 MB or unsupported types return 404.

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
Permanently deletes all items from the file trash, optionally filtering to only delete items older than a specified number of days. Removes files from cloud storage and recursively deletes folder contents. Returns counts of deleted files and folders.

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

Get one file's metadata only (URL, type, size, folder); openFile returns the content
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
Searches project files by their content using semantic/AI search. Returns files whose content matches the meaning of the query, along with the matching content snippet and a relevance score.

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
Returns all soft-deleted files and folders currently in the project's file trash. Items remain in trash until they are restored or permanently deleted. Each item includes its original metadata and the date it was trashed.

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
Saves a file to the project from raw text content (Markdown, Mermaid, CSV, JSON, YAML, plain text, etc.) or base64-encoded binary data — images (PNG, JPG, GIF, WebP, SVG) and documents alike (PDF, Word, Excel), with document text extracted and embedded exactly as a console upload would. The file is stored in the project and processed for AI embeddings (text) or image classification (images). Use this to save documents, notes, diagrams, structured data, or screenshots into the project knowledge base.

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
Publishes a draft legal document, making it immutable. Every locale listed in the project's enabled_locales must have non-empty content, otherwise the publish is rejected.

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
Updates the localized content of a draft legal document. Published documents are immutable and must be re-drafted as a new version.

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
Creates a new draft legal document for the project with auto-incremented version per (project, type). Content is a record keyed by locale code; at least one locale is required before publishing.

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

`gc.projectTrash` — Restore a trash batch, Restore an item from trash, Get one trashed item's entity type, deletion metadata and stored data snapshot, and more.

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

Restore an item from trash
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

Permanently delete an item from trash
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
Returns a paginated list of all soft-deleted resources across the entire project, including pages, posts, files, forms, and other entities. Supports filtering by entity type to narrow results. Each trash item includes the original entity metadata, deletion timestamp, and the user who deleted it.

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
Permanently and irreversibly deletes all items currently in the project trash. For media/file items, also removes the associated files from cloud storage. This operation cannot be undone. Returns the count of permanently deleted items.

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
Semantic search across all project knowledge — files, pages, posts, KB articles, developer docs, SDK methods, emails, and private CRM data. Returns the most relevant text chunks ranked by similarity, with sourceType and sourceId citations. Use the sourceId with the appropriate get endpoint (getFile, getWebsitePage, etc.) to retrieve the full source document.

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

`gc.website` — Ask the search engines to recrawl a page, post, article or doc now, Get the cookie banner copy, category toggles and policy links, Get one dialog with its full block tree, max width and close control, and more.

#### `submitContentToSearchEngines`

Ask the search engines to recrawl a page, post, article or doc now
Submits a content item's public URL to IndexNow (Bing, Yandex, Naver, Yep, Seznam) and nudges Google to re-fetch the sitemap. Publishing or editing content already does this automatically — reach for this when something is stale anyway: the page was edited outside the platform's knowledge, a domain was verified after the content went live, or an earlier submission failed. Only web-facing content has a URL to submit: pages, posts, KB articles, developer docs and the landings. Headers, footers, layouts and forms are not submittable because they have no URL of their own, even though editing one changes what a page renders. Drafts are not submitted either.

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
Permanently deletes a website dialog.

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
Creates a new popup dialog for this website app.

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

Get one footer with its full block tree, which lite listings omit
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
Permanently deletes a website footer component.

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

Get one header with its full block tree, which lite listings omit
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
Permanently deletes a website header component.

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

Get the one seeded page at the site root; no create call exists
Returns the app-level website landing page rendered at the website root.

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
Updates the fields that describe the website landing page rather than govern it: its internal name, and SEO title, description, image and noindex. Only the fields you send are changed. A landing is the app's root singleton, so it has no slug and no title. Can rebind the layout, header and footer. Cannot change the landing's content or visibility — use the block tools for content.

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

Get one layout with its full block tree, which lite listings omit
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
Permanently deletes a website page layout.

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

List page layouts you can apply when creating a page, newest first
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
Creates a new page layout for this website app.

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
Updates the fields that describe a page rather than govern it: SEO title, description, image, noindex, featured image, and tags. Only the fields you send are changed. Can rebind the layout, header and footer. Cannot change the page's content, status or visibility — use the block tools for content and publishContent to take it live.

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
| `isPublic` | `string` | No |
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
Creates a new website page. Requires a title. Optionally set slug, content blocks, SEO metadata, header, footer, and sidebar references.

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
Updates the fields that describe a post rather than govern it: SEO title and description, excerpt, author name, publish date, tags and featured image. Only the fields you send are changed. Can rebind the layout, header and footer. Cannot change the post's content or status — use the block tools for content and publishContent to take it live.

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
| `isPublic` | `string` | No |
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

Create a blog post; status defaults to draft, unlike createWebsitePage
Creates a new blog post. Requires a name and slug. Optionally set content blocks, excerpt, tags, featured image, SEO metadata, and publish status.

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

Get one URL redirect by id
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

Get one sidebar with its full block tree, which lite listings omit
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
Permanently deletes a website sidebar component.

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
Creates a new sidebar component for this website app.

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

Get the site's Google Tag Manager container ID, the only tracking setting
Returns the tracking configuration for this website app, including Google Tag Manager container ID.

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

<!-- API_REFERENCE_END -->

## Requirements

- Node.js 18+
- TypeScript 4.9+ (optional but recommended)

## License

MIT
