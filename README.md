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
const orgs = await gc.me.getMyOrganizations();
const org = orgs[0];

// List projects in the organization
const { data: projects } = await gc.projects.getProjects({ id: org.id });

// Find the website app in the first project
const project = projects[0];
const { data: apps } = await gc.projectApps.getProjectApps({
	id: org.id,
	projectId: project.id,
});
const websiteApp = apps.find((app) => app.appType === "website");

// List all website pages
const { data: pages } = await gc.website.getWebsitePages({
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
    │   ├── Templates
    │   ├── Headers
    │   ├── Footers
    │   ├── Sidebars
    │   └── Dialogs (modals/popups)
    ├── Email App
    │   ├── Email Templates
    │   ├── Campaigns
    │   ├── Segments
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
const orgs = await gc.me.getMyOrganizations();
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
const { data: projects, meta } = await gc.projects.getProjects({
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

Every project contains one or more apps. Use `getProjectApps` to discover them, then use the `appType` field to find the one you need:

```typescript
const { data: apps } = await gc.projectApps.getProjectApps({
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
const { data: pages, meta } = await gc.website.getWebsitePages({
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
const { data: posts } = await gc.website.getWebsitePosts({
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

### Templates, headers, footers, sidebars

```typescript
// Templates
const { data: templates } = await gc.website.listWebsiteTemplates({
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
const tags = await gc.website.getWebsiteTags({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});

// Get all page URLs (useful for sitemaps)
const { urls } = await gc.website.getWebsiteUrls({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
});
```

### Using `lite` mode

Many list endpoints accept a `lite` parameter. When set to `"true"`, responses omit heavy fields like full content bodies, returning only metadata. Use this for listing/browsing UI:

```typescript
const { data: pages } = await gc.website.getWebsitePages({
	organizationId: org.id,
	projectId: project.id,
	appId: websiteApp.id,
	lite: "true", // lighter response, no full content bodies
});
```

## Working with Email

```typescript
// List email templates
const { data: emails } = await gc.email.getEmails({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

// Get a specific email template
const email = await gc.email.getEmail({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
	emailId: "c3d4e5f6-7890-abcd-ef01-34567890abcd",
});

// List campaigns
const { data: campaigns } = await gc.email.getEmailCampaigns({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

// Get campaign send history
const sends = await gc.email.getEmailCampaignSends({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
	campaignId: campaigns[0].id,
});

// List segments
const { data: segments } = await gc.email.listEmailSegments({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
});

// Get contacts in a segment
const contacts = await gc.email.getEmailSegmentContacts({
	organizationId: org.id,
	projectId: project.id,
	appId: emailApp.id,
	segmentId: segments[0].id,
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
const { data: contacts, meta } = await gc.crm.getCrmContactsList({
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
const { data: companies } = await gc.crm.getCrmCompaniesList({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
});

// Get contacts for a specific company
const companyContacts = await gc.crm.getCrmCompanyContacts({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	companyId: companies[0].id,
});

// List activities (calls, emails, meetings, tasks, notes)
const { data: activities } = await gc.crm.getCrmActivitiesList({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
});

// Get activities for a specific contact
const contactActivities = await gc.crm.getCrmContactActivities({
	organizationId: org.id,
	projectId: project.id,
	appId: crmApp.id,
	contactId: contact.id,
});
```

## Working with Forms

```typescript
// List forms
const { data: forms } = await gc.forms.getFormsList({
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
const { data: submissions } = await gc.forms.getFormSubmissions({
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
const { data: files, meta } = await gc.projectFiles.getFiles({
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
const folders = await gc.projectFiles.getFileFolders({
	id: org.id,
	projectId: project.id,
});

// Get files in a specific folder
const { data: folderFiles } = await gc.projectFiles.getFiles({
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
const references = await gc.projectFiles.getFileReferences({
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
const { data, meta } = await gc.website.getWebsitePages({
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
		const { data, meta } = await gc.website.getWebsitePages({
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
140 methods across 28 resources.

- [API Keys](#api-keys) (2)
- [App Members](#app-members) (2)
- [Bug Reports](#bug-reports) (2)
- [CRM](#crm) (15)
- [Chat](#chat) (2)
- [Developers](#developers) (5)
- [Drafts](#drafts) (7)
- [Email](#email) (16)
- [Feature Requests](#feature-requests) (3)
- [Forms](#forms) (4)
- [Health](#health) (1)
- [Ideas](#ideas) (5)
- [Invitations](#invitations) (2)
- [KB](#kb) (5)
- [Me](#me) (6)
- [Notifications](#notifications) (1)
- [Organization Members](#organization-members) (4)
- [Organizations](#organizations) (4)
- [Project Apps](#project-apps) (4)
- [Project Branding](#project-branding) (2)
- [Project Domains](#project-domains) (2)
- [Project Files](#project-files) (10)
- [Project Legal Documents](#project-legal-documents) (2)
- [Project Members](#project-members) (2)
- [Project Trash](#project-trash) (2)
- [Project Workflows](#project-workflows) (4)
- [Projects](#projects) (5)
- [Website](#website) (21)

### API Keys

`gc.apiKeys` — Get my API keys, Get organization API keys, and more.

#### `listMyApiKeys`

Get my API keys
Returns all active API keys belonging to the current user. Each key includes its ID, name, creation date, expiration date, and associated organization. The secret key value is not returned for security.

**Returns:** `Promise<object>`

```typescript
const result = await gc.apiKeys.listMyApiKeys();
```

---

#### `listOrganizationApiKeys`

Get organization API keys
Returns all active API keys for an organization. Each key object includes its ID, name, creation date, expiration date, and the user it is associated with. The secret key value is never returned in list responses. Requires admin or owner role within the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<{
    data: Array<Record<string, unknown>>;
  }>`

```typescript
const result = await gc.apiKeys.listOrganizationApiKeys({
  id: "uuid-id",
});
```


---

### App Members

`gc.appMembers` — Get an app member by ID, Get members of an app, and more.

#### `getAppMember`

Get an app member by ID
Retrieves the full details of a specific app member by their membership ID. Returns the member's user profile information (name, email, avatar) along with their assigned role within the app and membership timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.appMembers.getAppMember({
  id: "uuid-id",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  memberId: "uuid-memberId",
});
```

---

#### `getAppMembers`

Get members of an app
Returns a paginated list of all members who have been explicitly assigned roles at the app level. Each member entry includes the user's profile information (name, email, avatar) and their assigned role within the app. This is separate from organization-level or project-level membership; only users with direct app-level role assignments are returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.appMembers.getAppMembers({
  id: "uuid-id",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```


---

### Bug Reports

`gc.bugReports` — Get my bug reports, Get comments for a bug report, and more.

#### `listMyBugReports`

Get my bug reports
Returns all bug reports submitted by the current user (up to 100). Each report includes its title, description, steps to reproduce, expected/actual behavior, severity, status (open/resolved/cancelled), browser info, page URL, report count, and linked GitHub issue details if any.

**Returns:** `Promise<object>`

```typescript
const result = await gc.bugReports.listMyBugReports();
```

---

#### `getBugReportComments`

Get comments for a bug report
Returns all team comments and responses for a specific bug report owned by the current user. Each comment includes its ID, the comment text, the author name, and a creation timestamp. Comments are returned in chronological order.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.bugReports.getBugReportComments({
  id: "uuid-id",
});
```


---

### CRM

`gc.crm` — Get activity, Get activities, Log activity, and more.

#### `getCrmActivity`

Get activity
Returns a single CRM activity by ID. Each activity is a natural-language description of something that happened, tagged by source app with optional JSON metadata and linked contact/company objects.

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

#### `getCrmActivitiesList`

Get activities
Returns a paginated timeline of CRM activities for the specified app, newest first. Each activity is a natural-language description of something that happened for a contact (or company), tagged by source app and optionally enriched with a JSON `data` payload. Supports free-text search across the description.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmActivitiesList({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `logCrmActivity`

Log activity
Appends an activity to the CRM timeline. `description` is a natural-language sentence ('Viewed pricing page', 'Unsubscribed from newsletter'). `source` identifies which app wrote it. Optional `data` carries structured metadata for agents to read. Link to a contact and/or company via id.

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

#### `getCrmCompanyActivities`

Get activities for a company
Returns the natural-language activity timeline for a company, newest first. Each row is a description of something that happened, tagged by source app with optional JSON metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmCompanyActivities({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
});
```

---

#### `getCrmCompanyContacts`

Get contacts for a company
Returns all CRM contacts linked to a specific company, ordered by last name then first name. Each contact includes name, email, phone, title, department, status, source, tags, and linked company object.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `companyId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmCompanyContacts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  companyId: "uuid-companyId",
});
```

---

#### `getCrmCompany`

Get company
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

#### `getCrmCompaniesList`

Get companies
Returns a paginated list of all CRM companies for the specified app. Supports search by company name or industry. Each company includes a count of associated contacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmCompaniesList({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getCrmContactActivities`

Get activities for a contact
Returns the natural-language activity timeline for a contact, newest first. Each row is a description of something that happened, tagged by source app with optional JSON metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `contactId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmContactActivities({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  contactId: "uuid-contactId",
});
```

---

#### `setCrmContactField`

Set contact field
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

Get contact
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

Tag contact
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

Untag contact
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

#### `getCrmContactsList`

Get contacts
Returns a paginated list of all CRM contacts for the specified app. Supports search by first name, last name, or email. Each contact includes associated company info if linked.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.crm.getCrmContactsList({
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

`gc.chat` — Get chat conversation with paginated messages, Get all chat conversations, and more.

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

Get all chat conversations
List all chat conversations for a given chat app. Returns a paginated list of conversations with their IDs, titles, visitor IDs, and timestamps. Supports search filtering by conversation title or visitor ID. Results are ordered by most recently updated first. This is an admin-only endpoint used to review and manage all customer chat conversations.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

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

### Developers

`gc.developers` — Get developer doc category, Get developer doc categories, Get developer doc, and more.

#### `getDevelopersDocCategory`

Get developer doc category
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

#### `listDevelopersDocCategories`

Get developer doc categories
Lists all developer docs categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories and sorted by their display order. Includes all active (non-deleted) categories.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<Array<Record<string, unknown>>>`

```typescript
const result = await gc.developers.listDevelopersDocCategories({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getDevelopersDoc`

Get developer doc
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

#### `listDevelopersDocs`

Get developer docs
Lists all developer docs for the specified app, with support for pagination, filtering by category, filtering by publish status, and full-text search across names and slugs. Returns docs sorted by creation date (newest first) by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `categoryId` | `string` | No |
| `status` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `listDevelopersSyncLogs`

List developer sync logs
Returns recent SDK sync events and last-synced timestamps for both OpenAPI and SDK sync.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.developers.listDevelopersSyncLogs({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```


---

### Drafts

`gc.drafts` — Generate AI content draft, Create an edit draft, Unarchive a draft, and more.

#### `generateDraft`

Generate AI content draft
Generates an AI content draft from a natural language prompt. Creates a system service account if needed, mints an ephemeral JWT, and calls the AI service. The resulting draft can be reviewed and accepted or rejected via the drafts API.

| Parameter | Type | Required |
|-----------|------|----------|
| `data` | `object` | Yes |

**Returns:** `Promise<{
    draftId: string;
    status: unknown;
  }>`

```typescript
const result = await gc.drafts.generateDraft({
  data: { /* ... */ },
});
```

---

#### `editDraft`

Create an edit draft
Creates a draft copy of existing content for non-destructive editing. The original stays untouched until the draft is accepted. On accept, the copy's content replaces the original. On reject, the copy is deleted.

| Parameter | Type | Required |
|-----------|------|----------|
| `data` | `object` | Yes |

**Returns:** `Promise<{
    draftId: string;
    status: unknown;
  }>`

```typescript
const result = await gc.drafts.editDraft({
  data: { /* ... */ },
});
```

---

#### `unarchiveDraft`

Unarchive a draft
Restores a previously archived draft to the default list.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.unarchiveDraft({
  id: "uuid-id",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `archiveDraft`

Archive a draft
Hides an accepted draft from the default list without deleting it. Archived drafts are preserved as a paper trail and for AI training data. Only accepted or partially_accepted drafts can be archived.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.archiveDraft({
  id: "uuid-id",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `getDraft`

Get a draft by ID
Retrieves the full details of a single AI-generated content draft including the prompt, generated content, tool calls, and sources.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.getDraft({
  id: "uuid-id",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `deleteDraft`

Delete a draft
Permanently deletes a draft. Only rejected, failed, or cancelled drafts can be deleted. Returns 409 if the draft is in any other status (pending, ready, accepted).

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `draftId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
    message?: string;
  }>`

```typescript
const result = await gc.drafts.deleteDraft({
  id: "uuid-id",
  projectId: "uuid-projectId",
  draftId: "uuid-draftId",
});
```

---

#### `listDrafts`

List drafts for a project
Returns a paginated list of AI-generated content drafts for the specified project. By default archived drafts are hidden — pass includeArchived=true to include them.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |
| `includeArchived` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.drafts.listDrafts({
  id: "uuid-id",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Email

`gc.email` — Send transactional email, Contact email timeline, Get email template, and more.

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

Contact email timeline
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

Get email template
Returns a single email template by ID, including name, subject line, full content blocks, header/footer references, and timestamps.

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

Unsubscribe a recipient
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

#### `getEmailRecipients`

List email recipients
Returns the subscribers for a specific email template. Includes currently subscribed and previously unsubscribed contacts.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `emailId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailRecipients({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  emailId: "uuid-emailId",
  page: 1,
});
```

---

#### `subscribeEmailRecipient`

Subscribe a contact
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

#### `getEmails`

Get email templates
Returns a list of all email templates for the specified app. Each template includes its name, subject line, content blocks, and associated header/footer references.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmails({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getEmailFooter`

Get email footer
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

#### `listEmailFooters`

Get email footers
Returns a list of all email footers for the specified app. Footers contain branding, unsubscribe links, and legal text appended to emails.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getEmailHeader`

Get email header
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

#### `listEmailHeaders`

Get email headers
Returns a list of all email headers for the specified app. Headers contain branding and navigation elements prepended to emails.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getEmailSend`

Get email send with events
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

Update send
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

#### `getEmailSends`

List email sends
Returns the log of sends (past + planned + queued) for this email app. Filter by email, contact, or status. Sorted by effective time (sent_at, then scheduled_for, then created_at) descending.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `emailId` | `string` | No |
| `contactId` | `string` | No |
| `status` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.email.getEmailSends({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `createEmailSend`

Create a planned send
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

`gc.featureRequests` — Get popular feature requests, Get my feature requests, Get comments for a feature request, and more.

#### `getPopularFeatureRequests`

Get popular feature requests
Returns all non-merged, non-cancelled feature requests sorted by vote count. Includes whether the current user has voted for each request and the comment count. Does not expose user identity information for privacy.

| Parameter | Type | Required |
|-----------|------|----------|
| `limit` | `string` | No |
| `offset` | `string` | No |
| `status` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.getPopularFeatureRequests();
```

---

#### `listMyFeatureRequests`

Get my feature requests
Returns all feature requests submitted by the current user (up to 100). Each request includes its title, description, priority, status (open/planned/shipped/cancelled), vote count, and linked GitHub issue details if any.

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.listMyFeatureRequests();
```

---

#### `getFeatureRequestComments`

Get comments for a feature request
Returns all team comments and responses for a specific feature request owned by the current user. Each comment includes its ID, the comment text, the author name, and a creation timestamp. Comments are returned in chronological order.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.featureRequests.getFeatureRequestComments({
  id: "uuid-id",
});
```


---

### Forms

`gc.forms` — Get form, Get form submission, Get form submissions, and more.

#### `getForm`

Get form
Retrieve the full details of a single form by its identifier. Returns the form's unique identifier, associated app identifier, name, URL slug, description, field definitions (each with name, type, and required status), rich content layout (Builder block structure used for rendering), settings (notification email, redirect URL, tags, source), active/inactive status, and creation and update timestamps.

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

#### `getFormSubmission`

Get form submission
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

#### `getFormSubmissions`

Get form submissions
Retrieve a paginated list of all submissions received for a specific form. Each submission includes its unique identifier, the parent form identifier, the user-submitted data (key-value pairs corresponding to form fields), metadata (user agent, IP address, referer, submission timestamp, tags, source), and the creation timestamp. Supports full-text search across submission data.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `formId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.getFormSubmissions({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  formId: "uuid-formId",
  page: 1,
});
```

---

#### `getFormsList`

Get forms
Retrieve a paginated list of all forms belonging to the specified Forms app. Each form in the response includes its unique identifier, name, URL slug, description, field definitions (name, type, required status), rich content layout, settings (notification email, redirect URL), active/inactive status, creation and update timestamps, and a count of how many submissions have been received. Supports searching forms by name or slug.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.forms.getFormsList({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```


---

### Health

`gc.health` — Verify LLM connectivity, and more.

#### `getHealthEcho`

Verify LLM connectivity
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

`gc.ideas` — Approve a Mind idea, Dismiss a Mind idea, Get a Mind idea, and more.

#### `approveIdea`

Approve a Mind idea
Approve an idea, which sets its status to 'approved'. If the idea's content type has draft enabled in the project's aiEntityConfig, this also triggers draft generation automatically. The idea must be in 'pending' status.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.approveIdea({
  id: "uuid-id",
  projectId: "uuid-projectId",
  ideaId: "uuid-ideaId",
  data: { /* ... */ },
});
```

---

#### `dismissIdea`

Dismiss a Mind idea
Dismiss an idea that the user doesn't want to pursue. The idea must be in 'pending' status. Optionally include a reason for dismissal. Dismissed ideas are tracked so Mind doesn't re-suggest them.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |
| `data` | `{
    reason?: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.dismissIdea({
  id: "uuid-id",
  projectId: "uuid-projectId",
  ideaId: "uuid-ideaId",
  data: { /* ... */ },
});
```

---

#### `getIdea`

Get a Mind idea
Returns full details of a Mind idea including title, rationale, outline, priority, similarity score, and status. If the idea has status 'pending', it can be approved (triggering draft generation) or dismissed.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `ideaId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.getIdea({
  id: "uuid-id",
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
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.ideas.listIdeas({
  id: "uuid-id",
  projectId: "uuid-projectId",
  page: 1,
});
```

---

#### `triggerIdeation`

Trigger Mind ideation for a project
Runs the Mind ideation pipeline for this project, producing new pending ideas. Optional 'target' narrows execution to one (contentType, operationKey) operation — useful for targeted testing. Returns the created ideas synchronously.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<{
    ideas: Array<unknown>;
    count: number;
  }>`

```typescript
const result = await gc.ideas.triggerIdeation({
  id: "uuid-id",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Invitations

`gc.invitations` — Get an invitation by ID, Get organization invitations, and more.

#### `getOrganizationInvitation`

Get an invitation by ID
Retrieves a single invitation by its ID within an organization. Returns the invitation object including invitee email, assigned role, status (pending, accepted, expired), creator, and timestamps. The 'id' param is the organization UUID and 'invitationId' is the invitation UUID. Returns 404 if the invitation does not exist.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `invitationId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.invitations.getOrganizationInvitation({
  id: "uuid-id",
  invitationId: "uuid-invitationId",
});
```

---

#### `getOrganizationInvitations`

Get organization invitations
Returns a paginated list of pending, accepted, and expired invitations for an organization. Each invitation includes the invitee email, assigned role, status, creation date, and expiration. Supports search by email, filtering by status, and sorting. Requires owner or admin role within the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.invitations.getOrganizationInvitations({
  id: "uuid-id",
});
```


---

### KB

`gc.kb` — Get KB article, Get KB articles, Get KB category, and more.

#### `getKbArticle`

Get KB article
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

#### `listKbArticles`

Get KB articles
Lists all knowledge base articles for the specified app, with support for pagination, filtering by category, filtering by publish status, and full-text search across names and slugs. Returns articles sorted by creation date (newest first) by default.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `categoryId` | `string` | No |
| `status` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getKbCategory`

Get KB category
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

#### `listKbCategories`

Get KB categories
Lists all knowledge base categories for the specified app, returned as a hierarchical tree structure. Categories are nested under their parent categories and sorted by their display order. Includes all active (non-deleted) categories.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<Array<Record<string, unknown>>>`

```typescript
const result = await gc.kb.listKbCategories({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getKbSettings`

Get KB settings
Retrieves the current configuration settings for the knowledge base app, including display preferences, branding, and behavioral options stored as a JSON settings object on the app record.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<{
    rootUrl?: string;
    brandingId?: string | unknown;
  }>`

```typescript
const result = await gc.kb.getKbSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```


---

### Me

`gc.me` — Get my suspension appeal messages, Get my notifications, Get organizations I belong to, and more.

#### `getMySuspensionMessages`

Get my suspension appeal messages
Returns the full suspension appeal message thread for the current user. Each message includes the sender (user or admin), the message content, and a timestamp. Only available to users with an active or past suspension.

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMySuspensionMessages();
```

---

#### `getMyNotifications`

Get my notifications
Returns a paginated list of notifications for the authenticated user. Supports filtering by read/unread status and notification type via query parameters. Each notification includes its type, title, message, read status, and associated resource reference.

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `status` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMyNotifications({
  page: 1,
});
```

---

#### `getMyOrganizations`

Get organizations I belong to
Returns all organizations that the authenticated user is a member of. Each organization includes its ID, name, slug, logo URL, and the user's role within that organization (e.g. owner, admin, member).

**Returns:** `Promise<Array<Record<string, unknown>>>`

```typescript
const result = await gc.me.getMyOrganizations();
```

---

#### `getMyInvitations`

Get my pending invitations
Returns a paginated list of pending organization invitations addressed to the current user's email. Each invitation includes the organization name, the role offered, who sent it, and when it was created. Supports standard pagination query parameters.

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMyInvitations();
```

---

#### `getMyActivities`

Get my activity history
Returns a paginated list of activities performed by or affecting the current user. Each activity includes the action taken, the resource type and ID involved, the actor, and a timestamp. Supports standard pagination query parameters (page, pageSize, sortBy, sortOrder).

| Parameter | Type | Required |
|-----------|------|----------|
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.me.getMyActivities({
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

`gc.organizationMembers` — Get member project memberships, Get member activities, Get a member by ID, and more.

#### `getMemberProjectMemberships`

Get member project memberships
Returns a list of all projects in the organization along with the specified member's access level for each project. Each entry includes the project ID, name, and the member's role/permission level within that project (or null if they have no direct project membership). Useful for auditing a member's project access across the organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.getMemberProjectMemberships({
  id: "uuid-id",
  memberId: "uuid-memberId",
});
```

---

#### `getOrganizationMemberActivities`

Get member activities
Returns a paginated activity feed for a specific member within an organization. Activities include actions the member has performed such as project updates, document edits, member management changes, and settings modifications. Each activity entry includes the action type, resource details, and timestamp. Supports pagination via page and pageSize query parameters.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `memberId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.getOrganizationMemberActivities({
  id: "uuid-id",
  memberId: "uuid-memberId",
  page: 1,
});
```

---

#### `getOrganizationMember`

Get a member by ID
Retrieves a single organization member by their member ID. Returns the member object including user profile (name, email, avatar), role, title, and join date. The 'id' param is the organization UUID and 'memberId' is the member UUID. Returns 404 if the member does not exist in this organization.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.getOrganizationMember({
  id: "uuid-id",
  memberId: "uuid-memberId",
});
```

---

#### `getOrganizationMembers`

Get organization members
Returns a paginated list of all members in an organization. Each member object includes the member ID, user profile (name, email, avatar), role (owner, admin, member), title, and join date. Supports search by name or email, filtering by role, and sorting. Pagination is controlled via page and pageSize query parameters.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizationMembers.getOrganizationMembers({
  id: "uuid-id",
  page: 1,
});
```


---

### Organizations

`gc.organizations` — Get a service account, Get organization service accounts, Get organization by slug, and more.

#### `getServiceAccount`

Get a service account
Returns the full details of a specific service account, including its name, description, role, and creation metadata. Only organization owners and admins can view service account details.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `accountId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.getServiceAccount({
  id: "uuid-id",
  accountId: "uuid-accountId",
});
```

---

#### `listServiceAccounts`

Get organization service accounts
Returns all service accounts configured for the organization. Service accounts are non-human identities used for programmatic API access via API keys. Only organization owners and admins can view service accounts.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.listServiceAccounts({
  id: "uuid-id",
});
```

---

#### `getOrganizationBySlug`

Get organization by slug
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

#### `getOrganization`

Get an organization by ID
Retrieves a single organization by its unique ID. Returns the full organization object including name, slug, logo URL, plan, status, member count, and timestamps. Returns 404 if the organization does not exist.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.organizations.getOrganization({
  id: "uuid-id",
});
```


---

### Project Apps

`gc.projectApps` — Get a project app by slug, Get a project app by ID, Get deleted apps in trash, and more.

#### `getProjectAppBySlug`

Get a project app by slug
Retrieves the full details of a single app by its URL-friendly slug within the specified project. This is an alternative to looking up an app by ID when you have the human-readable slug instead. Returns the same complete app object as the get-by-ID endpoint including name, slug, app type, configuration, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appSlug` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getProjectAppBySlug({
  id: "uuid-id",
  projectId: "uuid-projectId",
  appSlug: "my-app",
});
```

---

#### `getProjectApp`

Get a project app by ID
Retrieves the full details of a single app by its unique ID within the specified project. Returns the app's name, slug, app type, configuration settings, and timestamps. The app must belong to the specified project or a 404 error is returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getProjectApp({
  id: "uuid-id",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getDeletedProjectApps`

Get deleted apps in trash
Returns a list of all soft-deleted (trashed) apps within the specified project. These are apps that have been deleted but not yet permanently removed. Each app includes its full details including name, slug, app type, and deletion timestamp. Trashed apps can be restored using the restore endpoint or permanently deleted using the permanent delete endpoint.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getDeletedProjectApps({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```

---

#### `getProjectApps`

Get apps in a project
Returns a paginated list of all active (non-deleted) apps configured within the specified project. Apps represent individual applications such as websites, CRM instances, email campaigns, forms, knowledge bases, or chat widgets. Each app includes its unique ID, name, slug, app type, configuration, and timestamps. Supports pagination and search filtering.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectApps.getProjectApps({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```


---

### Project Branding

`gc.projectBranding` — Get project branding, Get project brandings, and more.

#### `getProjectBranding`

Get project branding
Retrieves the full details of a specific branding configuration by its unique ID within the specified project. Returns the branding's name and complete set of visual identity settings including primary and secondary colors, font selections, logo URLs, favicon, and any other configured styling properties. The branding must belong to the specified project.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `brandingId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectBranding.getProjectBranding({
  id: "uuid-id",
  projectId: "uuid-projectId",
  brandingId: "uuid-brandingId",
});
```

---

#### `listProjectBrandings`

Get project brandings
Returns a paginated list of all branding configurations for the specified project. Projects can have multiple named branding profiles (e.g., 'Website Brand', 'LMS Brand'), each containing visual identity settings such as primary and secondary colors, font selections, logo URLs, and favicon. Each branding entry includes its unique ID, name, and the full set of configured styling properties.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectBranding.listProjectBrandings({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```


---

### Project Domains

`gc.projectDomains` — Get domain verification instructions, Get all domains for a project, and more.

#### `getDomainVerificationInstructions`

Get domain verification instructions
Retrieves the DNS verification instructions for the specified custom domain. Returns the exact DNS record (type, name, and value) that must be added to the domain's DNS configuration at the domain registrar to prove ownership. This is required before the domain can be verified and used for serving content. The instructions include the CNAME or TXT record details needed for the verification process.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `domainId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectDomains.getDomainVerificationInstructions({
  id: "uuid-id",
  projectId: "uuid-projectId",
  domainId: "uuid-domainId",
});
```

---

#### `listProjectDomains`

Get all domains for a project
Returns a comprehensive list of all domains (both auto-generated and custom) across all apps within the specified project. Each domain entry includes its hostname, verification status, whether it is generated or custom, whether it is the primary domain for its app, and the associated app name and slug. Domains are grouped by app and sorted with generated domains first and primary domains prioritized.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectDomains.listProjectDomains({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```


---

### Project Files

`gc.projectFiles` — Get all places where a file is referenced, Get a file folder, Replace file content, and more.

#### `getFileReferences`

Get all places where a file is referenced
Returns a comprehensive list of all entities that reference this file across the project. This includes pages, headers, footers, blog posts, templates, sidebars, dialogs, forms, and branding settings. Useful for understanding the impact of deleting or replacing a file.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFileReferences({
  id: "uuid-id",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `getFileFolder`

Get a file folder
Retrieves the details of a single folder in the project file manager, including its name, parent folder ID, and creation metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `folderId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFileFolder({
  id: "uuid-id",
  projectId: "uuid-projectId",
  folderId: "uuid-folderId",
});
```

---

#### `replaceFileContent`

Replace file content
Replaces the content of an existing text file. The file must be a text-based type (Markdown, plain text, CSV, JSON, YAML, HTML, CSS, JS, XML, SVG). The file's storage object is overwritten, its size is updated, and AI embeddings are re-generated from the new content. The file ID, URL, metadata, and all references remain unchanged.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |
| `data` | `{
    content: string;
  }` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.replaceFileContent({
  id: "uuid-id",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
  data: { /* ... */ },
});
```

---

#### `openFile`

Read file content
Returns the actual content of a file inline — text as a string, images as base64. Use this when you need to read or analyze a file's content rather than just its metadata. Text files (Markdown, CSV, JSON, YAML, plain text, HTML, CSS, JS, XML, SVG) are returned in the 'content' field. Image files (PNG, JPG, GIF, WebP) are returned as base64 in the 'base64Content' field. Files over 10 MB or unsupported types return 404.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.openFile({
  id: "uuid-id",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `getFile`

Get a file
Retrieves the full details of a single file in the project file manager, including its filename, MIME type, size, dimensions, storage URL, alt text, caption, and folder assignment.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `fileId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFile({
  id: "uuid-id",
  projectId: "uuid-projectId",
  fileId: "uuid-fileId",
});
```

---

#### `getFileFolders`

Get file folders in a project
Returns all folders in the project file manager. Optionally filter by parentId to list only child folders of a specific parent folder. Pass parentId='null' or omit it to list root-level folders. Folders are used to organize uploaded files (images, documents, media).

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFileFolders({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```

---

#### `searchFiles`

Search files by content
Searches project files by their content using semantic/AI search. Returns files whose content matches the meaning of the query, along with the matching content snippet and a relevance score.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `query` | `string` | Yes |
| `limit` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.searchFiles({
  id: "uuid-id",
  projectId: "uuid-projectId",
  query: "search term",
});
```

---

#### `listFileTrash`

Get items in trash
Returns all soft-deleted files and folders currently in the project's file trash. Items remain in trash until they are restored or permanently deleted. Each item includes its original metadata and the date it was trashed.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.listFileTrash({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```

---

#### `saveFile`

Save a file from text or image content
Saves a file to the project from raw text content (Markdown, Mermaid, CSV, JSON, YAML, plain text, etc.) or base64-encoded image data (PNG, JPG, GIF, WebP, SVG). The file is stored in the project and processed for AI embeddings (text) or image classification (images). Use this to save documents, notes, diagrams, structured data, or screenshots into the project knowledge base.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.saveFile({
  id: "uuid-id",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```

---

#### `getFiles`

Get files in a project
Returns a paginated list of files (images, documents, media) uploaded to the project file manager. Supports full-text search by filename, filtering by folder ID and MIME type, and standard pagination and sorting options. Files at the root level can be retrieved by passing folderId as 'null'.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `folderId` | `string` | No |
| `mimeType` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectFiles.getFiles({
  id: "uuid-id",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Legal Documents

`gc.projectLegalDocuments` — Get a project legal document by ID, List project legal documents, and more.

#### `getProjectLegalDocument`

Get a project legal document by ID
Returns a single legal document version for the project, including its localized content map and publish status.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `documentId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.getProjectLegalDocument({
  id: "uuid-id",
  projectId: "uuid-projectId",
  documentId: "uuid-documentId",
});
```

---

#### `listProjectLegalDocuments`

List project legal documents
Returns a paginated list of legal document versions for the project, including drafts and published versions across all document types (terms of service, privacy policy, acceptable use policy, cookie policy, custom).

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectLegalDocuments.listProjectLegalDocuments({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```


---

### Project Members

`gc.projectMembers` — Get a project member by ID, Get project members, and more.

#### `getProjectMember`

Get a project member by ID
Retrieves the full details of a single project member by their membership ID, including their user profile information, assigned role, and membership metadata.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `memberId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectMembers.getProjectMember({
  id: "uuid-id",
  projectId: "uuid-projectId",
  memberId: "uuid-memberId",
});
```

---

#### `getProjectMembers`

Get project members
Returns a paginated list of users who are members of the specified project, including their roles and profile information. Supports search by name, filtering, and sorting. Project members have access to project resources based on their assigned role.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectMembers.getProjectMembers({
  id: "uuid-id",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Trash

`gc.projectTrash` — Get a single trash item, Get all items in project trash, and more.

#### `getProjectTrashItem`

Get a single trash item
Retrieves the full details of a single item in the project trash by its trash record ID. Includes the original entity type, entity ID, name, deletion timestamp, and the stored entity data snapshot.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `trashId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.getProjectTrashItem({
  id: "uuid-id",
  projectId: "uuid-projectId",
  trashId: "uuid-trashId",
});
```

---

#### `listProjectTrash`

Get all items in project trash
Returns a paginated list of all soft-deleted resources across the entire project, including pages, posts, files, forms, and other entities. Supports filtering by entity type to narrow results. Each trash item includes the original entity metadata, deletion timestamp, and the user who deleted it.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `type` | `string` | No |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectTrash.listProjectTrash({
  id: "uuid-id",
  projectId: "uuid-projectId",
  page: 1,
});
```


---

### Project Workflows

`gc.projectWorkflows`

#### `getWorkflowRun`

Get a workflow run and its tasks
| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `runId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectWorkflows.getWorkflowRun({
  id: "uuid-id",
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
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `runId` | `string` | Yes |

**Returns:** `Promise<{
    success: boolean;
  }>`

```typescript
const result = await gc.projectWorkflows.dismissWorkflowRun({
  id: "uuid-id",
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
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `status` | `string` | No |
| `type` | `string` | No |
| `includeDismissed` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projectWorkflows.listWorkflowRuns({
  id: "uuid-id",
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
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `data` | `object` | Yes |

```typescript
const result = await gc.projectWorkflows.createWorkflowRun({
  id: "uuid-id",
  projectId: "uuid-projectId",
  data: { /* ... */ },
});
```


---

### Projects

`gc.projects` — Get project by slug, Search project knowledge, Get all project URLs, and more.

#### `getProjectBySlug`

Get project by slug
Retrieves the full details of a single project by its URL-friendly slug within the specified organization. This is an alternative to looking up a project by its UUID when you have the human-readable slug from a URL or user input. Returns the same complete project object as the get-by-ID endpoint including name, slug, description, settings, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectSlug` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProjectBySlug({
  id: "uuid-id",
  projectSlug: "my-project",
});
```

---

#### `searchProject`

Search project knowledge
Semantic search across all project knowledge — files, pages, posts, KB articles, developer docs, SDK methods, emails, and private CRM data. Returns the most relevant text chunks ranked by similarity, with sourceType and sourceId citations. Use the sourceId with the appropriate get endpoint (getFile, getWebsitePage, etc.) to retrieve the full source document.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |
| `query` | `string` | Yes |
| `limit` | `string` | No |
| `sourceTypes` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.searchProject({
  id: "uuid-id",
  projectId: "uuid-projectId",
  query: "search term",
});
```

---

#### `getProjectUrls`

Get all project URLs
Returns resolved relative URLs for all published content across all apps in the project. Includes pages, posts, articles, etc. with name, path, type, and SEO metadata. Used for link resolution in AI builders, menus, emails, and navigation.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProjectUrls({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```

---

#### `getProject`

Get a project by ID
Retrieves the full details of a single project by its unique ID within the specified organization. Returns the project's name, slug, description, settings, and timestamps. The project must belong to the specified organization or a 404 error is returned.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `projectId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProject({
  id: "uuid-id",
  projectId: "uuid-projectId",
});
```

---

#### `getProjects`

Get projects in an organization
Returns a paginated list of all projects belonging to the specified organization. Projects are the top-level containers that hold apps, brandings, and domains. Supports search filtering by project name and pagination via page and pageSize query parameters. Each project in the response includes its unique ID, name, slug, description, and timestamps.

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.projects.getProjects({
  id: "uuid-id",
  page: 1,
});
```


---

### Website

`gc.website` — Get consent settings, Get dialog, Get dialogs, and more.

#### `getWebsiteConsentSettings`

Get consent settings
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

Get dialog
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

#### `listWebsiteDialogs`

Get dialogs
Returns a list of all popup dialogs configured for this website app. Dialogs are used for modals, popups, banners, and slide-ins.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getWebsiteCustomDomain`

Get custom domain
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

Get custom domains
Returns a list of all custom domains configured for this website app, including verification status, SSL status, and whether each is the primary domain.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.listWebsiteCustomDomains({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteFooter`

Get website footer
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

#### `listWebsiteFooters`

Get website footers
Returns a list of all footer components for this website app. Footers are reusable layout sections displayed at the bottom of pages.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getWebsiteHeader`

Get website header
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

#### `listWebsiteHeaders`

Get website headers
Returns a list of all header components for this website app. Headers are reusable navigation/branding sections displayed at the top of pages.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getWebsiteLayout`

Get website layout
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

#### `listWebsiteLayouts`

Get website layouts
Returns a list of all page layouts for this website app. Layouts provide reusable page layouts and content block structures.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getWebsitePage`

Get website page
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

#### `getWebsitePages`

Get website pages
Returns a list of all pages for this website app. Each page includes its title, slug, publish status, SEO metadata, and associated header/footer/sidebar references.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsitePages({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getWebsitePost`

Get blog post
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

#### `getWebsitePosts`

Get blog posts
Returns a paginated list of all blog posts for this website app. Each post includes title, slug, excerpt, publish status, author, tags, and featured image.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsitePosts({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
  page: 1,
});
```

---

#### `getWebsiteAppSettings`

Get website settings
Returns the website app settings including global SEO defaults, favicon, social image, language, and theme configuration.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<object>`

```typescript
const result = await gc.website.getWebsiteAppSettings({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteSidebar`

Get website sidebar
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

#### `listWebsiteSidebars`

Get website sidebars
Returns a list of all sidebar components for this website app. Sidebars are reusable layout sections displayed alongside page content.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |
| `page` | `string` | No |
| `pageSize` | `string` | No |
| `search` | `string` | No |
| `lite` | `string` | No |

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

#### `getWebsiteTags`

Get website tags
Returns a list of all tags used across pages and posts in this website app. Tags are used for categorization and filtering.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<Array<string>>`

```typescript
const result = await gc.website.getWebsiteTags({
  organizationId: "uuid-organizationId",
  projectId: "uuid-projectId",
  appId: "uuid-appId",
});
```

---

#### `getWebsiteTrackingSettings`

Get tracking settings
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

Get existing website page URLs
Returns a list of all existing page slugs for this website app. Use this to avoid generating duplicate URLs when creating new pages.

| Parameter | Type | Required |
|-----------|------|----------|
| `organizationId` | `string` | Yes |
| `projectId` | `string` | Yes |
| `appId` | `string` | Yes |

**Returns:** `Promise<{
    slugs: Array<string>;
  }>`

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
