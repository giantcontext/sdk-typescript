// src/index.ts
var GiantContextError = class extends Error {
  status;
  body;
  constructor(status, body) {
    super(`HTTP ${status}: ${body}`);
    this.name = "GiantContextError";
    this.status = status;
    this.body = body;
  }
};
var BaseResource = class {
  constructor(client) {
    this.client = client;
  }
  client;
  async request(url, options) {
    return this.client.request(url, options);
  }
  cleanParams(params) {
    return Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== void 0)
    );
  }
};
var APIKeysResource = class extends BaseResource {
  /**
   * List your own API keys across organizations; never returns the secret value
   * @method GET /me/api-keys
   */
  listMyApiKeys = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    organizationId
  }) => {
    const endpoint = `/me/api-keys`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      organizationId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List all API keys in an organization; metadata only, no secret values
   * @method GET /organizations/{organizationId}/api-keys
   */
  listOrganizationApiKeys = async ({
    organizationId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    userId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/api-keys`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      userId
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var AppMembersResource = class extends BaseResource {
  /**
   * Get an app member by ID
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/members/{memberId}
   */
  getAppMember = async ({
    organizationId,
    projectId,
    appId,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List users with explicit app-level roles, excluding inherited org and project access
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/members
   */
  listAppMembers = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    role
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      role
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var BriefsResource = class extends BaseResource {
  /**
   * Approve a ready brief, which starts draft generation from its draft prompt
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/approve
   */
  approveBrief = async ({
    organizationId,
    projectId,
    briefId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}/approve`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Reject a ready brief so it never reaches draft generation
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/reject
   */
  rejectBrief = async ({
    organizationId,
    projectId,
    briefId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}/reject`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one brief's full paper trail from idea to draft prompt
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}
   */
  getBrief = async ({
    organizationId,
    projectId,
    briefId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List Mind briefs for a project
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/briefs
   */
  listBriefs = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    status,
    contentType,
    targetContentType,
    ideaId,
    createdAt,
    updatedAt,
    startedAt,
    completedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      status,
      contentType,
      targetContentType,
      ideaId,
      createdAt,
      updatedAt,
      startedAt,
      completedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var BugReportsResource = class extends BaseResource {
  /**
   * List bug reports you filed, with severity, status and GitHub issue link
   * @method GET /me/bug-reports
   */
  listMyBugReports = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    severity,
    source,
    reportCount,
    createdAt
  }) => {
    const endpoint = `/me/bug-reports`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      severity,
      source,
      reportCount,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List comments for a bug report
   * @method GET /me/bug-reports/{bugReportId}/comments
   */
  listBugReportComments = async ({
    bugReportId,
    page,
    pageSize,
    lite,
    sort,
    search,
    author,
    source,
    createdAt
  }) => {
    const endpoint = `/me/bug-reports/${encodeURIComponent(String(bugReportId))}/comments`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      author,
      source,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var BuilderResource = class extends BaseResource {
  /**
   * Get every content type and the blocks allowed in it
   * @method GET /builder/content-types
   */
  getContentTypes = async () => {
    const endpoint = `/builder/content-types`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get the styles schema shared by every block
   * @method GET /builder/styles
   */
  getBlockStyles = async () => {
    const endpoint = `/builder/styles`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get one block type's own fields and hints; shared styles come from getBlockStyles
   * @method GET /builder/blocks/{blockType}
   */
  getBlock = async ({
    blockType,
    contentType
  }) => {
    const endpoint = `/builder/blocks/${encodeURIComponent(String(blockType))}`;
    const params = this.cleanParams({ contentType });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Delete a section and every block inside it; recoverable from version history
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/delete
   */
  deleteSection = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/delete`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Insert a section into a content tree
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/insert
   */
  insertSection = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/insert`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Update a section's own properties; blocks stay untouched and columns cannot be patched
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/update
   */
  updateSection = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/update`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Delete a block, returning it; the prior tree stays in version history
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/delete
   */
  deleteBlock = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/delete`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Insert a block into a content tree
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/insert
   */
  insertBlock = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/insert`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Update a block's data and/or styles by merging only the fields you send; null clears a field
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/update
   */
  updateBlock = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/update`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Move a section before or after a sibling, or append it at the end
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/move
   */
  moveSection = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/move`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Move a block beside a sibling or into a section, leaving its data unchanged
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/move
   */
  moveBlock = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/move`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Return a published item to draft — status only, never the body
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/unpublish
   */
  unpublishContent = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/unpublish`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Publish a page, post, article, doc or email — status only, never the body
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/publish
   */
  publishContent = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/publish`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Find a string or a block type inside content
   * @method GET /organizations/{organizationId}/projects/{projectId}/content/search
   */
  searchContent = async ({
    organizationId,
    projectId,
    query,
    blockTypes,
    contentTypes,
    status,
    limit
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/search`;
    const params = this.cleanParams({
      query,
      blockTypes,
      contentTypes,
      status,
      limit
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get a content tree for editing
   * @method GET /organizations/{organizationId}/projects/{projectId}/content
   */
  getContent = async ({
    organizationId,
    projectId,
    contentType,
    contentId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content`;
    const params = this.cleanParams({ contentType, contentId });
    return this.request(endpoint, { method: "GET", params });
  };
};
var CRMResource = class extends BaseResource {
  /**
   * Get one activity's description, writing app and JSON data payload
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities/{activityId}
   */
  getCrmActivity = async ({
    organizationId,
    projectId,
    appId,
    activityId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities/${encodeURIComponent(String(activityId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List the activity timeline for a whole CRM app, newest first, searchable
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
   */
  listCrmActivities = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    contactId,
    companyId,
    writtenBy,
    createdAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      contactId,
      companyId,
      writtenBy,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Log a past-tense sentence onto a contact or company timeline, append-only
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
   */
  logCrmActivity = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List a company's activity timeline, newest first, whatever app logged it
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities
   */
  listCrmCompanyActivities = async ({
    organizationId,
    projectId,
    appId,
    companyId,
    page,
    pageSize,
    lite,
    sort,
    search,
    writtenBy,
    contactId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/activities`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      writtenBy,
      contactId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List contacts linked to one company, paginated, alphabetical by last name
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts
   */
  listCrmCompanyContacts = async ({
    organizationId,
    projectId,
    appId,
    companyId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    source,
    title,
    department,
    email,
    emailSubscribed
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/contacts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      source,
      title,
      department,
      email,
      emailSubscribed
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one company with its profile fields and count of linked contacts
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}
   */
  getCrmCompany = async ({
    organizationId,
    projectId,
    appId,
    companyId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List companies in one CRM app, alphabetical by name, each with contact count
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies
   */
  listCrmCompanies = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    industry,
    size,
    email,
    website
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      industry,
      size,
      email,
      website
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List a contact's activity timeline, newest first, including rows written by other apps
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities
   */
  listCrmContactActivities = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    page,
    pageSize,
    lite,
    sort,
    search,
    writtenBy,
    companyId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/activities`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      writtenBy,
      companyId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Set one key in a contact's custom properties, merging without clobbering siblings
   * @method PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/fields
   */
  setCrmContactField = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/fields`;
    return this.request(endpoint, { method: "PUT", data });
  };
  /**
   * Get one contact with all fields, tags and its linked company
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
   */
  getCrmContact = async ({
    organizationId,
    projectId,
    appId,
    contactId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Update contact
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
   */
  updateCrmContact = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * Tag one contact with a single free-form string, idempotent, returns the contact
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags
   */
  tagCrmContact = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/tags`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Untag one contact, one tag per call, idempotent, returns the updated contact
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags
   */
  untagCrmContact = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/tags`;
    return this.request(endpoint, { method: "DELETE", data });
  };
  /**
   * List contacts in one CRM app, alphabetical by last name, search supported
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
   */
  listCrmContacts = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    companyId,
    status,
    source,
    title,
    department,
    email,
    emailSubscribed,
    locale
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      companyId,
      status,
      source,
      title,
      department,
      email,
      emailSubscribed,
      locale
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create contact
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
   */
  createCrmContact = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var ChatResource = class extends BaseResource {
  /**
   * Get chat conversation with paginated messages
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations/{conversationId}
   */
  getChatConversation = async ({
    organizationId,
    projectId,
    appId,
    conversationId,
    cursor,
    cursorId,
    direction,
    limit
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/chat/${encodeURIComponent(String(appId))}/conversations/${encodeURIComponent(String(conversationId))}`;
    const params = this.cleanParams({ cursor, cursorId, direction, limit });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List every visitor conversation in a chat app, most recently updated first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations
   */
  listChatConversations = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    visitorId,
    userId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/chat/${encodeURIComponent(String(appId))}/conversations`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      visitorId,
      userId
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ContentVersionsResource = class extends BaseResource {
  /**
   * Restore an entity to an older version; non-destructive, forward history is kept
   * @method POST /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}/restore
   */
  restoreContentVersion = async ({
    organizationId,
    projectId,
    versionId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content-versions/${encodeURIComponent(String(versionId))}/restore`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Get one version's full content snapshot, which the list tool omits
   * @method GET /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}
   */
  getContentVersion = async ({
    organizationId,
    projectId,
    versionId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content-versions/${encodeURIComponent(String(versionId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List one entity's edit history newest first; metadata only, no content snapshots
   * @method GET /organizations/{organizationId}/projects/{projectId}/content-versions
   */
  listContentVersions = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    source,
    createdBy,
    version,
    createdAt,
    contentType,
    contentId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content-versions`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      source,
      createdBy,
      version,
      createdAt,
      contentType,
      contentId
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var DevelopersResource = class extends BaseResource {
  /**
   * Get one category's own fields; its docs come from listDevelopersDocs with categoryId
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
   */
  getDevelopersDocCategory = async ({
    organizationId,
    projectId,
    appId,
    categoryId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete developer doc category
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
   */
  deleteDevelopersDocCategory = async ({
    organizationId,
    projectId,
    appId,
    categoryId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a category's name and description; cannot re-slug or re-parent it
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
   */
  updateDevelopersDocCategoryMeta = async ({
    organizationId,
    projectId,
    appId,
    categoryId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, {
      method: "PATCH",
      data
    });
  };
  /**
   * List doc categories as a nested tree, sorted by display order
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
   */
  listDevelopersDocCategories = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    slug,
    icon
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      slug,
      icon
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a doc category before the docs that reference it; slug must be unique
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
   */
  createDevelopersDocCategory = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one doc with its full content, SEO and category ids
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}
   */
  getDevelopersDoc = async ({
    organizationId,
    projectId,
    appId,
    docId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs/${encodeURIComponent(String(docId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete developer doc
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}
   */
  deleteDevelopersDoc = async ({
    organizationId,
    projectId,
    appId,
    docId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs/${encodeURIComponent(String(docId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a doc's name, title, slug, SEO, excerpt, featured image and tags; cannot publish or edit content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}
   */
  updateDevelopersDocMeta = async ({
    organizationId,
    projectId,
    appId,
    docId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs/${encodeURIComponent(String(docId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List docs in a developer portal, newest first; pass lite=true to skip huge content
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs
   */
  listDevelopersDocs = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    isPublic,
    categoryId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      isPublic,
      categoryId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a doc; slug must be unique, status defaults to draft, isPublic to true
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs
   */
  createDevelopersDoc = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Update the landing page's SEO title, description and image; not its content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/landing
   */
  updateDevelopersLandingMeta = async ({
    organizationId,
    projectId,
    appId,
    data,
    locale,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/landing`;
    const params = this.cleanParams({ locale, draftId });
    return this.request(endpoint, { method: "PATCH", data, params });
  };
  /**
   * Get one URL redirect by id
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/redirects/{redirectId}
   */
  getDevelopersRedirect = async ({
    organizationId,
    projectId,
    appId,
    redirectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a developer portal's URL redirects, newest first, with from, to, status and source
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/redirects
   */
  listDevelopersRedirects = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    source,
    status,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/redirects`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      source,
      status,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get the SDK and OpenAPI sync status and recent runs; diagnostic only, starts nothing
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs
   */
  getDevelopersSyncLogs = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/sync-logs`;
    return this.request(endpoint, { method: "GET" });
  };
};
var DraftsResource = class extends BaseResource {
  /**
   * Unarchive a draft back into the default list; already-unarchived is a no-op
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/unarchive
   */
  unarchiveDraft = async ({
    organizationId,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/unarchive`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Archive an accepted draft to hide it from the default list without deleting
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/archive
   */
  archiveDraft = async ({
    organizationId,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/archive`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Generate AI edits to existing content; async, returns a pending draftId to poll
   * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/edit
   */
  generateEditDraft = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/generate/edit`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one draft with its prompt, generated content and status; poll while pending
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}
   */
  getDraft = async ({
    organizationId,
    projectId,
    draftId,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
    const params = this.cleanParams({ lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Delete a rejected, failed or cancelled draft permanently; other statuses return 409
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}
   */
  deleteDraft = async ({
    organizationId,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Generate new content from a prompt; async, takes 5-15 minutes, nothing publishes yet
   * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/new
   */
  generateNewDraft = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/generate/new`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Create a copy-on-write draft of existing content for manual editing, no AI
   * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/edit
   */
  createEditDraft = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/edit`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List a project's drafts newest first; archived hidden unless includeArchived
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/drafts
   */
  listDrafts = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    name,
    prompt,
    contentType,
    createdAt,
    updatedAt,
    includeArchived
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      name,
      prompt,
      contentType,
      createdAt,
      updatedAt,
      includeArchived
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var EmailResource = class extends BaseResource {
  /**
   * Send transactional email
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/actions/send
   */
  sendTransactionalEmail = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/actions/send`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one contact's sent and planned emails with per-send opens and clicks
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/contacts/{contactId}/timeline
   */
  getContactEmailTimeline = async ({
    organizationId,
    projectId,
    appId,
    contactId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/timeline`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get one email with its full content blocks and header/footer links
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
   */
  getEmail = async ({
    organizationId,
    projectId,
    appId,
    emailId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete email
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
   */
  deleteEmail = async ({
    organizationId,
    projectId,
    appId,
    emailId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update an email's name, slug, subject and send-trigger sentence, not content or status
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
   */
  updateEmailMeta = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * Get email recipient
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}
   */
  getEmailRecipient = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    recipientId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients/${encodeURIComponent(String(recipientId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Unsubscribe a contact from one email; the row is kept for resubscribe
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}/unsubscribe
   */
  unsubscribeEmailRecipient = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    recipientId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients/${encodeURIComponent(String(recipientId))}/unsubscribe`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List one email's subscribers, including past unsubscribes, newest subscription first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients
   */
  listEmailRecipients = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    page,
    pageSize,
    lite,
    sort,
    contactId,
    subscribedAt,
    unsubscribedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      contactId,
      subscribedAt,
      unsubscribedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Subscribe a CRM contact to one email; resubscribes if previously unsubscribed
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients
   */
  subscribeEmailRecipient = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List emails in an email app, newest first; pass lite=true to skip content
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails
   */
  listEmails = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    slug,
    name,
    headerId,
    footerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      slug,
      name,
      headerId,
      footerId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one footer's block content in full; listEmailFooters lite=true returns metadata only
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}
   */
  getEmailFooter = async ({
    organizationId,
    projectId,
    appId,
    footerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete email footer
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}
   */
  deleteEmailFooter = async ({
    organizationId,
    projectId,
    appId,
    footerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List footers in an email app, newest first; pass lite=true to skip content
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers
   */
  listEmailFooters = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a footer shell; only name is required, add blocks afterwards
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers
   */
  createEmailFooter = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one header's full block tree; no lite mode, so expect heavy output
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}
   */
  getEmailHeader = async ({
    organizationId,
    projectId,
    appId,
    headerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete email header
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}
   */
  deleteEmailHeader = async ({
    organizationId,
    projectId,
    appId,
    headerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List headers in an email app, newest first; pass lite=true to skip content
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers
   */
  listEmailHeaders = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a header shell; only name is required, add blocks afterwards
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers
   */
  createEmailHeader = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one send with its full delivery and engagement event log
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}
   */
  getEmailSend = async ({
    organizationId,
    projectId,
    appId,
    sendId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends/${encodeURIComponent(String(sendId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Update a send to reschedule or cancel; only planned and queued rows accept edits
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}
   */
  updateEmailSend = async ({
    organizationId,
    projectId,
    appId,
    sendId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends/${encodeURIComponent(String(sendId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List past, queued and planned sends across the app, filterable by email or contact
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
   */
  listEmailSends = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    emailId,
    contactId,
    status,
    locale,
    recipientEmail
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      emailId,
      contactId,
      status,
      locale,
      recipientEmail
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a send for one contact; defaults to planned, which sends nothing until queued
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
   */
  createEmailSend = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var FeatureRequestsResource = class extends BaseResource {
  /**
   * List everyone's feature requests ranked by votes, showing whether you voted
   * @method GET /me/feature-requests/popular
   */
  listPopularFeatureRequests = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    priority,
    voteCount,
    createdAt
  }) => {
    const endpoint = `/me/feature-requests/popular`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      priority,
      voteCount,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List feature requests you filed, with status, vote count and GitHub issue link
   * @method GET /me/feature-requests
   */
  listMyFeatureRequests = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    priority,
    source,
    voteCount,
    createdAt
  }) => {
    const endpoint = `/me/feature-requests`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      priority,
      source,
      voteCount,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List comments for a feature request
   * @method GET /me/feature-requests/{featureRequestId}/comments
   */
  listFeatureRequestComments = async ({
    featureRequestId,
    page,
    pageSize,
    lite,
    sort,
    search,
    author,
    source,
    createdAt
  }) => {
    const endpoint = `/me/feature-requests/${encodeURIComponent(String(featureRequestId))}/comments`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      author,
      source,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var FormsResource = class extends BaseResource {
  /**
   * Get one form's fields, settings and content blocks in Builder format
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
   */
  getForm = async ({
    organizationId,
    projectId,
    appId,
    formId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete form
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
   */
  deleteForm = async ({
    organizationId,
    projectId,
    appId,
    formId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a form's name and description; cannot re-slug it or change fields
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
   */
  updateFormMeta = async ({
    organizationId,
    projectId,
    appId,
    formId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * Get one submission's full answers plus its user agent, IP and referer
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions/{submissionId}
   */
  getFormSubmission = async ({
    organizationId,
    projectId,
    appId,
    formId,
    submissionId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}/submissions/${encodeURIComponent(String(submissionId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List one form's submissions, newest first, with submitted data and metadata
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions
   */
  listFormSubmissions = async ({
    organizationId,
    projectId,
    appId,
    formId,
    page,
    pageSize,
    lite,
    sort,
    search,
    createdAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}/submissions`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List forms in a Forms app with their fields and submission counts, newest first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms
   */
  listForms = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    slug,
    isActive,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      slug,
      isActive,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var HealthResource = class extends BaseResource {
  /**
   * Get a unique LLM-generated message, proving the AI pipeline is live
   * @method GET /health/echo
   */
  getHealthEcho = async () => {
    const endpoint = `/health/echo`;
    return this.request(endpoint, { method: "GET" });
  };
};
var IdeasResource = class extends BaseResource {
  /**
   * Approve a pending idea to start content generation; a draft may follow automatically
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/approve
   */
  approveIdea = async ({
    organizationId,
    projectId,
    ideaId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/approve`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Dismiss a pending idea with an optional reason so Mind stops suggesting it
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/dismiss
   */
  dismissIdea = async ({
    organizationId,
    projectId,
    ideaId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/dismiss`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one idea's rationale, outline and similarity score before approving or dismissing
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}
   */
  getIdea = async ({
    organizationId,
    projectId,
    ideaId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List Mind ideas for a project
   * @method GET /organizations/{organizationId}/projects/{projectId}/mind/ideas
   */
  listIdeas = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    priority,
    appId,
    contentType,
    targetContentType,
    operationKey,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      priority,
      appId,
      contentType,
      targetContentType,
      operationKey,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Trigger Mind ideation for a project
   * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas
   */
  triggerIdeation = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var InvitationsResource = class extends BaseResource {
  /**
   * Get an invitation by ID
   * @method GET /organizations/{organizationId}/invitations/{invitationId}
   */
  getOrganizationInvitation = async ({
    organizationId,
    invitationId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/invitations/${encodeURIComponent(String(invitationId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List invitations sent by an organization: pending, accepted and expired, with role
   * @method GET /organizations/{organizationId}/invitations
   */
  listOrganizationInvitations = async ({
    organizationId,
    page,
    pageSize,
    lite,
    sort,
    search,
    role,
    email
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/invitations`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      role,
      email
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var KBResource = class extends BaseResource {
  /**
   * Get one article including its full content tree, status, SEO and category ids
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
   */
  getKbArticle = async ({
    organizationId,
    projectId,
    appId,
    articleId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles/${encodeURIComponent(String(articleId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete KB article
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
   */
  deleteKbArticle = async ({
    organizationId,
    projectId,
    appId,
    articleId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles/${encodeURIComponent(String(articleId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update an article's name, title, slug, SEO fields, excerpt, tags and featured image; cannot publish or edit content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
   */
  updateKbArticleMeta = async ({
    organizationId,
    projectId,
    appId,
    articleId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles/${encodeURIComponent(String(articleId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List articles in one KB app, newest first; pass lite=true to omit huge content
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles
   */
  listKbArticles = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    slug,
    status,
    isPublic,
    categoryId,
    createdAt,
    updatedAt,
    publishedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      slug,
      status,
      isPublic,
      categoryId,
      createdAt,
      updatedAt,
      publishedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create an article shell; publishing with content also ingests it for AI chat
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles
   */
  createKbArticle = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one category's name, slug, description, parent and order; not its articles
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
   */
  getKbCategory = async ({
    organizationId,
    projectId,
    appId,
    categoryId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete KB category
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
   */
  deleteKbCategory = async ({
    organizationId,
    projectId,
    appId,
    categoryId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a category's name and description; cannot re-slug, reorder or re-parent it
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
   */
  updateKbCategoryMeta = async ({
    organizationId,
    projectId,
    appId,
    categoryId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
    return this.request(endpoint, {
      method: "PATCH",
      data
    });
  };
  /**
   * List a KB app's categories as a nested parent-child tree, roots paginated
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
   */
  listKbCategories = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    slug,
    icon
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      slug,
      icon
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a category, optionally nested under a parent; order assigned automatically
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
   */
  createKbCategory = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Update knowledge base landing page metadata
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/landing
   */
  updateKbLandingMeta = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/landing`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * Get one URL redirect by id
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/redirects/{redirectId}
   */
  getKbRedirect = async ({
    organizationId,
    projectId,
    appId,
    redirectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a knowledge base's URL redirects, newest first, with from, to, status and source
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/redirects
   */
  listKbRedirects = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    source,
    status,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/redirects`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      source,
      status,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var MeResource = class extends BaseResource {
  /**
   * List your suspension appeal thread, both your messages and admin replies
   * @method GET /me/suspension-messages
   */
  listMySuspensionMessages = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    authorType,
    authorId,
    createdAt
  }) => {
    const endpoint = `/me/suspension-messages`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      authorType,
      authorId,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List the caller's notifications, filterable by read status and type
   * @method GET /me/notifications
   */
  listMyNotifications = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    type
  }) => {
    const endpoint = `/me/notifications`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      type
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List organizations you belong to and your role in each
   * @method GET /me/organizations
   */
  listMyOrganizations = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    slug,
    plan,
    subscriptionStatus,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/me/organizations`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      slug,
      plan,
      subscriptionStatus,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List pending org invitations addressed to the caller's email, with offered role
   * @method GET /me/invitations
   */
  listMyInvitations = async ({
    page,
    pageSize,
    lite,
    sort,
    role
  }) => {
    const endpoint = `/me/invitations`;
    const params = this.cleanParams({ page, pageSize, lite, sort, role });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List activity by or affecting you, with the resource each touched, paginated
   * @method GET /me/activities
   */
  listMyActivities = async ({
    page,
    pageSize,
    lite,
    sort,
    search,
    action,
    resourceType
  }) => {
    const endpoint = `/me/activities`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      action,
      resourceType
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get current user profile and permissions
   * @method GET /me
   */
  getMe = async () => {
    const endpoint = `/me`;
    return this.request(endpoint, { method: "GET" });
  };
};
var NotificationsResource = class extends BaseResource {
  /**
   * Send a notification
   * @method POST /notifications/send
   */
  sendNotification = async ({
    data
  }) => {
    const endpoint = `/notifications/send`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var OrganizationMembersResource = class extends BaseResource {
  /**
   * List all organization projects with one member's access level, null where none
   * @method GET /organizations/{organizationId}/members/{memberId}/project-memberships
   */
  listMemberProjectMemberships = async ({
    organizationId,
    memberId,
    page,
    pageSize,
    lite,
    sort,
    role,
    joinedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/project-memberships`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      role,
      joinedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List every app with one member's role; project roles do not grant app access
   * @method GET /organizations/{organizationId}/members/{memberId}/app-memberships
   */
  listMemberAppMemberships = async ({
    organizationId,
    memberId,
    page,
    pageSize,
    lite,
    sort,
    appType,
    role,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/app-memberships`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      appType,
      role,
      projectId
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get member activities
   * @method GET /organizations/{organizationId}/members/{memberId}/activities
   */
  listOrganizationMemberActivities = async ({
    organizationId,
    memberId,
    page,
    pageSize,
    lite,
    sort,
    search,
    action,
    resourceType
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/activities`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      action,
      resourceType
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one member's profile, role, title and join date by member UUID
   * @method GET /organizations/{organizationId}/members/{memberId}
   */
  getOrganizationMember = async ({
    organizationId,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List members of an organization with their roles, paginated and searchable
   * @method GET /organizations/{organizationId}/members
   */
  listOrganizationMembers = async ({
    organizationId,
    page,
    pageSize,
    lite,
    sort,
    search,
    role,
    title,
    userId,
    invitedBy,
    joinedAt,
    invitedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      role,
      title,
      userId,
      invitedBy,
      joinedAt,
      invitedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var OrganizationsResource = class extends BaseResource {
  /**
   * Get a service account
   * @method GET /organizations/{organizationId}/service-accounts/{accountId}
   */
  getServiceAccount = async ({
    organizationId,
    accountId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/service-accounts/${encodeURIComponent(String(accountId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List an organization's service accounts, newest first
   * @method GET /organizations/{organizationId}/service-accounts
   */
  listServiceAccounts = async ({
    organizationId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    email,
    createdAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/service-accounts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      email,
      createdAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one organization's name, slug, plan, status and member count by ID
   * @method GET /organizations/{organizationId}
   */
  getOrganization = async ({
    organizationId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get an organization from a URL slug when you have no ID
   * @method GET /organizations/by-slug/{slug}
   */
  getOrganizationBySlug = async ({
    slug
  }) => {
    const endpoint = `/organizations/by-slug/${encodeURIComponent(String(slug))}`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectAppsResource = class extends BaseResource {
  /**
   * Get a project app by slug
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/by-slug/{appSlug}
   */
  getProjectAppBySlug = async ({
    organizationId,
    projectId,
    appSlug
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/by-slug/${encodeURIComponent(String(appSlug))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Read one app's settings, whatever kind of app it is
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings
   */
  getAppSettings = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/settings`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Change one app's settings, merging into what is already there
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings
   */
  updateAppSettings = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/settings`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * Get a project app by ID
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}
   */
  getProjectApp = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List soft-deleted apps in a project's trash, restorable or permanently deletable
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/trash
   */
  listDeletedProjectApps = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    slug,
    appType,
    isActive
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/trash`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      slug,
      appType,
      isActive
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List a project's active apps and their types to obtain the appId
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps
   */
  listProjectApps = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    slug,
    appType,
    isActive
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      slug,
      appType,
      isActive
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectBrandingResource = class extends BaseResource {
  /**
   * Get one branding profile's colors, fonts, logos and favicon
   * @method GET /organizations/{organizationId}/projects/{projectId}/brandings/{brandingId}
   */
  getProjectBranding = async ({
    organizationId,
    projectId,
    brandingId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/brandings/${encodeURIComponent(String(brandingId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a project's named branding profiles: colors, fonts, logos, favicon
   * @method GET /organizations/{organizationId}/projects/{projectId}/brandings
   */
  listProjectBrandings = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdBy,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/brandings`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdBy,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectDomainsResource = class extends BaseResource {
  /**
   * Get the exact DNS record the owner must add to verify a domain
   * @method GET /organizations/{organizationId}/projects/{projectId}/domains/{domainId}/verification
   */
  getDomainVerificationInstructions = async ({
    organizationId,
    projectId,
    domainId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/domains/${encodeURIComponent(String(domainId))}/verification`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a project's manageable domains with verification status and owning app
   * @method GET /organizations/{organizationId}/projects/{projectId}/domains
   */
  listProjectDomains = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    appId,
    appType,
    hostname,
    isGenerated,
    isPrimary,
    isVerified,
    verificationStatus
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/domains`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      appId,
      appType,
      hostname,
      isGenerated,
      isPrimary,
      isVerified,
      verificationStatus
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectFilesResource = class extends BaseResource {
  /**
   * Restore an item from trash
   * @method POST /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}/restore
   */
  restoreFileTrashItem = async ({
    organizationId,
    projectId,
    itemId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/${encodeURIComponent(String(itemId))}/restore`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List places where a file is referenced
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}/references
   */
  listFileReferences = async ({
    organizationId,
    projectId,
    fileId,
    page,
    pageSize,
    lite,
    sort,
    search,
    type,
    id
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/references`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      type,
      id
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one folder's name and parent; use listFiles with folderId to see its files
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}
   */
  getFileFolder = async ({
    organizationId,
    projectId,
    folderId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete a file folder (files are moved to root)
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}
   */
  deleteFileFolder = async ({
    organizationId,
    projectId,
    folderId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Replace a text file's content in place; id, URL and references stay unchanged
   * @method PUT /organizations/{organizationId}/projects/{projectId}/files/{fileId}/content
   */
  replaceFileContent = async ({
    organizationId,
    projectId,
    fileId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/content`;
    return this.request(endpoint, { method: "PUT", data });
  };
  /**
   * Permanently delete an item from trash
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}
   */
  permanentDeleteFileTrashItem = async ({
    organizationId,
    projectId,
    itemId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/${encodeURIComponent(String(itemId))}`;
    return this.request(endpoint, { method: "DELETE", data });
  };
  /**
   * Open a file's content inline: text as string, images as base64, 10 MB cap
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}/open
   */
  openFile = async ({
    organizationId,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/open`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Empty trash (permanently delete old items)
   * @method POST /organizations/{organizationId}/projects/{projectId}/files/trash/empty
   */
  emptyFileTrash = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/empty`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one file's metadata only (URL, type, size, folder); openFile returns the content
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}
   */
  getFile = async ({
    organizationId,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete a file
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/{fileId}
   */
  deleteFile = async ({
    organizationId,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List file folders in a project
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/folders
   */
  listFileFolders = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    parentId,
    name,
    createdBy,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/folders`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      parentId,
      name,
      createdBy,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Search file contents by meaning; returns matching snippet and relevance score per file
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/search
   */
  searchFiles = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    mimeType,
    similarity,
    filename,
    query,
    limit
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/search`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      mimeType,
      similarity,
      filename,
      query,
      limit
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List a project's trashed files and folders, restorable until permanently deleted
   * @method GET /organizations/{organizationId}/projects/{projectId}/files/trash
   */
  listFileTrash = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    type,
    mimeType,
    parentId,
    deletedBy,
    deletedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      type,
      mimeType,
      parentId,
      deletedBy,
      deletedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Save a file from text or image content
   * @method POST /organizations/{organizationId}/projects/{projectId}/files/save
   */
  saveFile = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/save`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List a project's files, with search, filtering and sorting
   * @method GET /organizations/{organizationId}/projects/{projectId}/files
   */
  listFiles = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    isPublic,
    grounding,
    mimeType,
    folderId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      isPublic,
      grounding,
      mimeType,
      folderId
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectLegalDocumentsResource = class extends BaseResource {
  /**
   * Publish a draft project legal document
   * @method POST /organizations/{organizationId}/projects/{projectId}/legal/{documentId}/publish
   */
  publishProjectLegalDocument = async ({
    organizationId,
    projectId,
    documentId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}/publish`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Get a project legal document by ID
   * @method GET /organizations/{organizationId}/projects/{projectId}/legal/{documentId}
   */
  getProjectLegalDocument = async ({
    organizationId,
    projectId,
    documentId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Update a draft project legal document
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/legal/{documentId}
   */
  updateProjectLegalDocument = async ({
    organizationId,
    projectId,
    documentId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List a project's legal document versions across all types, draft and published
   * @method GET /organizations/{organizationId}/projects/{projectId}/legal
   */
  listProjectLegalDocuments = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    type,
    status
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      type,
      status
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a new draft project legal document
   * @method POST /organizations/{organizationId}/projects/{projectId}/legal
   */
  createProjectLegalDocument = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var ProjectMembersResource = class extends BaseResource {
  /**
   * Get a project member by ID
   * @method GET /organizations/{organizationId}/projects/{projectId}/members/{memberId}
   */
  getProjectMember = async ({
    organizationId,
    projectId,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List users added to a project with their roles
   * @method GET /organizations/{organizationId}/projects/{projectId}/members
   */
  listProjectMembers = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    role,
    title,
    userId,
    joinedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/members`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      role,
      title,
      userId,
      joinedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectTrashResource = class extends BaseResource {
  /**
   * Restore a trash batch
   * @method POST /organizations/{organizationId}/projects/{projectId}/trash/batches/{batchId}/restore
   */
  restoreProjectTrashBatch = async ({
    organizationId,
    projectId,
    batchId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/batches/${encodeURIComponent(String(batchId))}/restore`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Restore an item from trash
   * @method POST /organizations/{organizationId}/projects/{projectId}/trash/{trashId}/restore
   */
  restoreProjectTrashItem = async ({
    organizationId,
    projectId,
    trashId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}/restore`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Get one trashed item's entity type, deletion metadata and stored data snapshot
   * @method GET /organizations/{organizationId}/projects/{projectId}/trash/{trashId}
   */
  getProjectTrashItem = async ({
    organizationId,
    projectId,
    trashId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Permanently delete an item from trash
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/trash/{trashId}
   */
  permanentDeleteProjectTrashItem = async ({
    organizationId,
    projectId,
    trashId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List soft-deleted items across a whole project, filterable by entity type
   * @method GET /organizations/{organizationId}/projects/{projectId}/trash
   */
  listProjectTrash = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    entityType
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      entityType
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Empty all items from trash
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/trash
   */
  emptyProjectTrash = async ({
    organizationId,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash`;
    return this.request(endpoint, { method: "DELETE" });
  };
};
var ProjectWorkflowsResource = class extends BaseResource {
  /**
   * Get a workflow run and its tasks
   * @method GET /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}
   */
  getWorkflowRun = async ({
    organizationId,
    projectId,
    runId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Dismiss a workflow run
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}
   */
  dismissWorkflowRun = async ({
    organizationId,
    projectId,
    runId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List workflow runs
   * @method GET /organizations/{organizationId}/projects/{projectId}/workflows/runs
   */
  listWorkflowRuns = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    type,
    createdAt,
    startedAt,
    completedAt,
    includeDismissed
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      type,
      createdAt,
      startedAt,
      completedAt,
      includeDismissed
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Start a workflow run
   * @method POST /organizations/{organizationId}/projects/{projectId}/workflows/runs
   */
  createWorkflowRun = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var ProjectsResource = class extends BaseResource {
  /**
   * Get one project from its URL slug, same object as the by-ID lookup
   * @method GET /organizations/{organizationId}/projects/by-slug/{projectSlug}
   */
  getProjectBySlug = async ({
    organizationId,
    projectSlug
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/by-slug/${encodeURIComponent(String(projectSlug))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Search project material by meaning, not literal text; returns ranked cited excerpts
   * @method GET /organizations/{organizationId}/projects/{projectId}/search
   */
  searchSources = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    sourceType,
    sourceId,
    similarity,
    query,
    limit,
    sourceTypes
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/search`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      sourceType,
      sourceId,
      similarity,
      query,
      limit,
      sourceTypes
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List resolved paths for all published content, for building links and menus
   * @method GET /organizations/{organizationId}/projects/{projectId}/urls
   */
  listProjectUrls = async ({
    organizationId,
    projectId,
    page,
    pageSize,
    lite,
    sort,
    search,
    app,
    type,
    id,
    path
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/urls`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      app,
      type,
      id,
      path
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one project's name, slug, description and settings within an organization
   * @method GET /organizations/{organizationId}/projects/{projectId}
   */
  getProject = async ({
    organizationId,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List projects in an organization; the IDs every project-level tool needs
   * @method GET /organizations/{organizationId}/projects
   */
  listProjects = async ({
    organizationId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    slug,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      slug,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var WebsiteResource = class extends BaseResource {
  /**
   * Ask the search engines to recrawl a page, post, article or doc now
   * @method POST /organizations/{organizationId}/projects/{projectId}/content/search-index
   */
  submitContentToSearchEngines = async ({
    organizationId,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/search-index`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get the cookie banner copy, category toggles and policy links
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/consent
   */
  getWebsiteConsentSettings = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/consent`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get one dialog with its full block tree, max width and close control
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}
   */
  getWebsiteDialog = async ({
    organizationId,
    projectId,
    appId,
    dialogId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs/${encodeURIComponent(String(dialogId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete dialog
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}
   */
  deleteWebsiteDialog = async ({
    organizationId,
    projectId,
    appId,
    dialogId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs/${encodeURIComponent(String(dialogId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List popup dialogs (modals, banners, slide-ins) in a site, newest first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs
   */
  listWebsiteDialogs = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    maxWidth,
    includeClose,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      maxWidth,
      includeClose,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a popup dialog; nothing shows it until a button links dialog:{id}
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs
   */
  createWebsiteDialog = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one domain with its verification token, verified state and primary flag
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains/{domainId}
   */
  getWebsiteCustomDomain = async ({
    organizationId,
    projectId,
    appId,
    domainId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/domains/${encodeURIComponent(String(domainId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a site's custom domains, primary first, with verified state and verification token
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains
   */
  listWebsiteCustomDomains = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    isPrimary,
    isVerified,
    isGenerated,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/domains`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      isPrimary,
      isVerified,
      isGenerated,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one footer with its full block tree, which lite listings omit
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}
   */
  getWebsiteFooter = async ({
    organizationId,
    projectId,
    appId,
    footerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete website footer
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}
   */
  deleteWebsiteFooter = async ({
    organizationId,
    projectId,
    appId,
    footerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List a site's footers newest first, each with its block tree unless lite
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers
   */
  listWebsiteFooters = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a reusable footer shell; pages attach it by id, content optional
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers
   */
  createWebsiteFooter = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one header with its full block tree, which lite listings omit
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}
   */
  getWebsiteHeader = async ({
    organizationId,
    projectId,
    appId,
    headerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete website header
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}
   */
  deleteWebsiteHeader = async ({
    organizationId,
    projectId,
    appId,
    headerId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List a site's headers newest first, each with its block tree unless lite
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers
   */
  listWebsiteHeaders = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a reusable header shell; pages attach it by id, content optional
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers
   */
  createWebsiteHeader = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get the one seeded page at the site root; no create call exists
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/landing
   */
  getWebsiteLanding = async ({
    organizationId,
    projectId,
    appId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/landing`;
    const params = this.cleanParams({ draftId });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Update the landing page's name and SEO fields; cannot publish or edit content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/landing
   */
  updateWebsiteLandingMeta = async ({
    organizationId,
    projectId,
    appId,
    data,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/landing`;
    const params = this.cleanParams({ draftId });
    return this.request(endpoint, { method: "PATCH", data, params });
  };
  /**
   * Get one layout with its full block tree, which lite listings omit
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}
   */
  getWebsiteLayout = async ({
    organizationId,
    projectId,
    appId,
    layoutId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts/${encodeURIComponent(String(layoutId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete website layout
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}
   */
  deleteWebsiteLayout = async ({
    organizationId,
    projectId,
    appId,
    layoutId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts/${encodeURIComponent(String(layoutId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List page layouts you can apply when creating a page, newest first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts
   */
  listWebsiteLayouts = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a layout shell; pages set layoutId to share its block tree
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts
   */
  createWebsiteLayout = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one page with its full block tree, SEO, status and layout ids
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
   */
  getWebsitePage = async ({
    organizationId,
    projectId,
    appId,
    pageId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages/${encodeURIComponent(String(pageId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete website page
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
   */
  deleteWebsitePage = async ({
    organizationId,
    projectId,
    appId,
    pageId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages/${encodeURIComponent(String(pageId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a page's name, title, slug, SEO fields, featured image and tags; cannot publish or edit content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
   */
  updateWebsitePageMeta = async ({
    organizationId,
    projectId,
    appId,
    pageId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages/${encodeURIComponent(String(pageId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List a site's pages with slug, live URL and publish status, newest first
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages
   */
  listWebsitePages = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    slug,
    isPublic,
    layoutId,
    headerId,
    footerId,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      slug,
      isPublic,
      layoutId,
      headerId,
      footerId,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a page shell; content optional and status defaults to published, live immediately
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages
   */
  createWebsitePage = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one blog post with its full content blocks, tags and SEO fields
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
   */
  getWebsitePost = async ({
    organizationId,
    projectId,
    appId,
    postId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts/${encodeURIComponent(String(postId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete blog post
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
   */
  deleteWebsitePost = async ({
    organizationId,
    projectId,
    appId,
    postId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts/${encodeURIComponent(String(postId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * Update a post's name, title, slug, excerpt, author, publish date, tags and SEO, not its content
   * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
   */
  updateWebsitePostMeta = async ({
    organizationId,
    projectId,
    appId,
    postId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts/${encodeURIComponent(String(postId))}`;
    return this.request(endpoint, { method: "PATCH", data });
  };
  /**
   * List blog posts in a site, newest first, with author, tags and status
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts
   */
  listWebsitePosts = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    status,
    slug,
    isPublic,
    authorId,
    authorName,
    publishDate,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      status,
      slug,
      isPublic,
      authorId,
      authorName,
      publishDate,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a blog post; status defaults to draft, unlike createWebsitePage
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts
   */
  createWebsitePost = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get one URL redirect by id
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/redirects/{redirectId}
   */
  getWebsiteRedirect = async ({
    organizationId,
    projectId,
    appId,
    redirectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List a site's URL redirects, newest first, with from, to, status and source
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/redirects
   */
  listWebsiteRedirects = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    source,
    status,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/redirects`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      source,
      status,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get one sidebar with its full block tree, which lite listings omit
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}
   */
  getWebsiteSidebar = async ({
    organizationId,
    projectId,
    appId,
    sidebarId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars/${encodeURIComponent(String(sidebarId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete website sidebar
   * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}
   */
  deleteWebsiteSidebar = async ({
    organizationId,
    projectId,
    appId,
    sidebarId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars/${encodeURIComponent(String(sidebarId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List a site's sidebars newest first, each with its block tree unless lite
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars
   */
  listWebsiteSidebars = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    name,
    createdAt,
    updatedAt
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      name,
      createdAt,
      updatedAt
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a reusable sidebar shell; a layoutSidebar block points at it by id
   * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars
   */
  createWebsiteSidebar = async ({
    organizationId,
    projectId,
    appId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * List the tag names in use across a site's pages and posts
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags
   */
  listWebsiteTags = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    lite,
    sort,
    search,
    tag
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tags`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
      sort,
      search,
      tag
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get the site's Google Tag Manager container ID, the only tracking setting
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tracking
   */
  getWebsiteTrackingSettings = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tracking`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get existing page slugs and each page's layout, to avoid duplicate slugs
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/urls
   */
  getWebsiteUrls = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/urls`;
    return this.request(endpoint, { method: "GET" });
  };
};
var GiantContextClient = class {
  baseUrl;
  timeout;
  apiKey;
  jwtToken = null;
  tokenExpiresAt = 0;
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl || "https://api.giantcontext.com").replace(
      /\/$/,
      ""
    );
    this.timeout = config.timeout || 3e4;
  }
  async fetchWithTimeout(url, init) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers
        }
      });
      if (!response.ok) {
        const body = await response.text();
        throw new GiantContextError(response.status, body);
      }
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async getToken() {
    if (this.jwtToken && Date.now() < this.tokenExpiresAt - 6e4) {
      return this.jwtToken;
    }
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/auth/token`,
      {
        method: "POST",
        body: JSON.stringify({ apiKey: this.apiKey })
      }
    );
    const data = await response.json();
    this.jwtToken = data.token;
    this.tokenExpiresAt = new Date(data.expiresAt).getTime();
    return this.jwtToken;
  }
  async request(url, options) {
    const token = await this.getToken();
    let path = `${this.baseUrl}${url}`;
    if (options.params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== void 0 && value !== null) {
          searchParams.set(key, String(value));
        }
      }
      const qs = searchParams.toString();
      if (qs) path += `?${qs}`;
    }
    const response = await this.fetchWithTimeout(path, {
      method: options.method,
      headers: { Authorization: `Bearer ${token}` },
      body: options.data ? JSON.stringify(options.data) : void 0
    });
    if (response.status === 204) return void 0;
    return response.json();
  }
};
var GiantContext = class {
  client;
  apiKeys;
  appMembers;
  briefs;
  bugReports;
  builder;
  crm;
  chat;
  contentVersions;
  developers;
  drafts;
  email;
  featureRequests;
  forms;
  health;
  ideas;
  invitations;
  kb;
  me;
  notifications;
  organizationMembers;
  organizations;
  projectApps;
  projectBranding;
  projectDomains;
  projectFiles;
  projectLegalDocuments;
  projectMembers;
  projectTrash;
  projectWorkflows;
  projects;
  website;
  constructor(config) {
    this.client = new GiantContextClient(config);
    this.apiKeys = new APIKeysResource(this.client);
    this.appMembers = new AppMembersResource(this.client);
    this.briefs = new BriefsResource(this.client);
    this.bugReports = new BugReportsResource(this.client);
    this.builder = new BuilderResource(this.client);
    this.crm = new CRMResource(this.client);
    this.chat = new ChatResource(this.client);
    this.contentVersions = new ContentVersionsResource(this.client);
    this.developers = new DevelopersResource(this.client);
    this.drafts = new DraftsResource(this.client);
    this.email = new EmailResource(this.client);
    this.featureRequests = new FeatureRequestsResource(this.client);
    this.forms = new FormsResource(this.client);
    this.health = new HealthResource(this.client);
    this.ideas = new IdeasResource(this.client);
    this.invitations = new InvitationsResource(this.client);
    this.kb = new KBResource(this.client);
    this.me = new MeResource(this.client);
    this.notifications = new NotificationsResource(this.client);
    this.organizationMembers = new OrganizationMembersResource(this.client);
    this.organizations = new OrganizationsResource(this.client);
    this.projectApps = new ProjectAppsResource(this.client);
    this.projectBranding = new ProjectBrandingResource(this.client);
    this.projectDomains = new ProjectDomainsResource(this.client);
    this.projectFiles = new ProjectFilesResource(this.client);
    this.projectLegalDocuments = new ProjectLegalDocumentsResource(
      this.client
    );
    this.projectMembers = new ProjectMembersResource(this.client);
    this.projectTrash = new ProjectTrashResource(this.client);
    this.projectWorkflows = new ProjectWorkflowsResource(this.client);
    this.projects = new ProjectsResource(this.client);
    this.website = new WebsiteResource(this.client);
  }
};
var createGiantContext = (config) => {
  return new GiantContext(config);
};
var index_default = createGiantContext;
export {
  GiantContext,
  GiantContextError,
  createGiantContext,
  index_default as default
};
