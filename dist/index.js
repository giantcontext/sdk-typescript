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
   * Get my API keys
   * @method GET /me/api-keys
   */
  listMyApiKeys = async () => {
    const endpoint = `/me/api-keys`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get organization API keys
   * @method GET /organizations/{id}/api-keys
   */
  listOrganizationApiKeys = async ({
    id
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/api-keys`;
    return this.request(endpoint, { method: "GET" });
  };
};
var AppMembersResource = class extends BaseResource {
  /**
   * Get an app member by ID
   * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members/{memberId}
   */
  getAppMember = async ({
    id,
    projectId,
    appId,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get members of an app
   * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members
   */
  getAppMembers = async ({
    id,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members`;
    return this.request(endpoint, { method: "GET" });
  };
};
var BugReportsResource = class extends BaseResource {
  /**
   * Get my bug reports
   * @method GET /me/bug-reports
   */
  listMyBugReports = async () => {
    const endpoint = `/me/bug-reports`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get comments for a bug report
   * @method GET /me/bug-reports/{id}/comments
   */
  getBugReportComments = async ({
    id
  }) => {
    const endpoint = `/me/bug-reports/${encodeURIComponent(String(id))}/comments`;
    return this.request(endpoint, { method: "GET" });
  };
};
var CRMResource = class extends BaseResource {
  /**
   * Get activity
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
   * Get activities
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
   */
  getCrmActivitiesList = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Log activity
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
   * Get activities for a company
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities
   */
  getCrmCompanyActivities = async ({
    organizationId,
    projectId,
    appId,
    companyId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/activities`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get contacts for a company
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts
   */
  getCrmCompanyContacts = async ({
    organizationId,
    projectId,
    appId,
    companyId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/contacts`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get company
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
   * Get companies
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies
   */
  getCrmCompaniesList = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get activities for a contact
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities
   */
  getCrmContactActivities = async ({
    organizationId,
    projectId,
    appId,
    contactId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/activities`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Set contact field
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
   * Get contact
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
   * @method PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
   */
  updateCrmContact = async ({
    organizationId,
    projectId,
    appId,
    contactId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}`;
    return this.request(endpoint, { method: "PUT", data });
  };
  /**
   * Tag contact
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
   * Untag contact
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
   * Get contacts
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
   */
  getCrmContactsList = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts`;
    const params = this.cleanParams({ page, pageSize, search });
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
   * Get all chat conversations
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations
   */
  listChatConversations = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/chat/${encodeURIComponent(String(appId))}/conversations`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
};
var DevelopersResource = class extends BaseResource {
  /**
   * Get developer doc category
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
   * Get developer doc categories
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
   */
  listDevelopersDocCategories = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
    return this.request(endpoint, {
      method: "GET"
    });
  };
  /**
   * Get developer doc
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
   * Get developer docs
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs
   */
  listDevelopersDocs = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    categoryId,
    status,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs`;
    const params = this.cleanParams({
      page,
      pageSize,
      categoryId,
      status,
      search,
      lite
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * List developer sync logs
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs
   */
  listDevelopersSyncLogs = async ({
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
   * Generate AI content draft
   * @method POST /drafts/generate
   */
  generateDraft = async ({
    data
  }) => {
    const endpoint = `/drafts/generate`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Create an edit draft
   * @method POST /drafts/edit
   */
  editDraft = async ({
    data
  }) => {
    const endpoint = `/drafts/edit`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Unarchive a draft
   * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/unarchive
   */
  unarchiveDraft = async ({
    id,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/unarchive`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Archive a draft
   * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/archive
   */
  archiveDraft = async ({
    id,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/archive`;
    return this.request(endpoint, { method: "POST" });
  };
  /**
   * Get a draft by ID
   * @method GET /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
   */
  getDraft = async ({
    id,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Delete a draft
   * @method DELETE /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
   */
  deleteDraft = async ({
    id,
    projectId,
    draftId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List drafts for a project
   * @method GET /organizations/{id}/projects/{projectId}/mind/drafts
   */
  listDrafts = async ({
    id,
    projectId,
    page,
    pageSize,
    lite,
    includeArchived
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts`;
    const params = this.cleanParams({
      page,
      pageSize,
      lite,
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
   * Contact email timeline
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
   * Get email template
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
   * Unsubscribe a recipient
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
   * List email recipients
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients
   */
  getEmailRecipients = async ({
    organizationId,
    projectId,
    appId,
    emailId,
    page,
    pageSize
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients`;
    const params = this.cleanParams({ page, pageSize });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Subscribe a contact
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
   * Get email templates
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails
   */
  getEmails = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get email footer
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
   * Get email footers
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers
   */
  listEmailFooters = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get email header
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
   * Get email headers
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers
   */
  listEmailHeaders = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get email send with events
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
   * Update send
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
   * List email sends
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
   */
  getEmailSends = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    emailId,
    contactId,
    status
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends`;
    const params = this.cleanParams({
      page,
      pageSize,
      emailId,
      contactId,
      status
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Create a planned send
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
   * Get popular feature requests
   * @method GET /me/feature-requests/popular
   */
  getPopularFeatureRequests = async ({
    limit,
    offset,
    status
  }) => {
    const endpoint = `/me/feature-requests/popular`;
    const params = this.cleanParams({ limit, offset, status });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get my feature requests
   * @method GET /me/feature-requests
   */
  listMyFeatureRequests = async () => {
    const endpoint = `/me/feature-requests`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get comments for a feature request
   * @method GET /me/feature-requests/{id}/comments
   */
  getFeatureRequestComments = async ({
    id
  }) => {
    const endpoint = `/me/feature-requests/${encodeURIComponent(String(id))}/comments`;
    return this.request(endpoint, { method: "GET" });
  };
};
var FormsResource = class extends BaseResource {
  /**
   * Get form
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
   * Get form submission
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
   * Get form submissions
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions
   */
  getFormSubmissions = async ({
    organizationId,
    projectId,
    appId,
    formId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}/submissions`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get forms
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms
   */
  getFormsList = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
};
var HealthResource = class extends BaseResource {
  /**
   * Verify LLM connectivity
   * @method GET /health/echo
   */
  getHealthEcho = async () => {
    const endpoint = `/health/echo`;
    return this.request(endpoint, { method: "GET" });
  };
};
var IdeasResource = class extends BaseResource {
  /**
   * Approve a Mind idea
   * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/approve
   */
  approveIdea = async ({
    id,
    projectId,
    ideaId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/approve`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Dismiss a Mind idea
   * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/dismiss
   */
  dismissIdea = async ({
    id,
    projectId,
    ideaId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/dismiss`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get a Mind idea
   * @method GET /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}
   */
  getIdea = async ({
    id,
    projectId,
    ideaId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List Mind ideas for a project
   * @method GET /organizations/{id}/projects/{projectId}/mind/ideas
   */
  listIdeas = async ({
    id,
    projectId,
    page,
    pageSize,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
    const params = this.cleanParams({ page, pageSize, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Trigger Mind ideation for a project
   * @method POST /organizations/{id}/projects/{projectId}/mind/ideas
   */
  triggerIdeation = async ({
    id,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var InvitationsResource = class extends BaseResource {
  /**
   * Get an invitation by ID
   * @method GET /organizations/{id}/invitations/{invitationId}
   */
  getOrganizationInvitation = async ({
    id,
    invitationId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/invitations/${encodeURIComponent(String(invitationId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get organization invitations
   * @method GET /organizations/{id}/invitations
   */
  getOrganizationInvitations = async ({
    id
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/invitations`;
    return this.request(endpoint, { method: "GET" });
  };
};
var KBResource = class extends BaseResource {
  /**
   * Get KB article
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
   * Get KB articles
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles
   */
  listKbArticles = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    categoryId,
    status,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles`;
    const params = this.cleanParams({
      page,
      pageSize,
      categoryId,
      status,
      search,
      lite
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get KB category
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
   * Get KB categories
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
   */
  listKbCategories = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
    return this.request(endpoint, {
      method: "GET"
    });
  };
  /**
   * Get KB settings
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/settings
   */
  getKbSettings = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/settings`;
    return this.request(endpoint, { method: "GET" });
  };
};
var MeResource = class extends BaseResource {
  /**
   * Get my suspension appeal messages
   * @method GET /me/suspension-messages
   */
  getMySuspensionMessages = async () => {
    const endpoint = `/me/suspension-messages`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get my notifications
   * @method GET /me/notifications
   */
  getMyNotifications = async ({
    page,
    pageSize,
    search,
    status
  }) => {
    const endpoint = `/me/notifications`;
    const params = this.cleanParams({ page, pageSize, search, status });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get organizations I belong to
   * @method GET /me/organizations
   */
  getMyOrganizations = async () => {
    const endpoint = `/me/organizations`;
    return this.request(endpoint, {
      method: "GET"
    });
  };
  /**
   * Get my pending invitations
   * @method GET /me/invitations
   */
  getMyInvitations = async () => {
    const endpoint = `/me/invitations`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get my activity history
   * @method GET /me/activities
   */
  getMyActivities = async ({
    page,
    pageSize,
    lite
  }) => {
    const endpoint = `/me/activities`;
    const params = this.cleanParams({ page, pageSize, lite });
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
   * Get member project memberships
   * @method GET /organizations/{id}/members/{memberId}/project-memberships
   */
  getMemberProjectMemberships = async ({
    id,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}/project-memberships`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get member activities
   * @method GET /organizations/{id}/members/{memberId}/activities
   */
  getOrganizationMemberActivities = async ({
    id,
    memberId,
    page,
    pageSize,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}/activities`;
    const params = this.cleanParams({ page, pageSize, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get a member by ID
   * @method GET /organizations/{id}/members/{memberId}
   */
  getOrganizationMember = async ({
    id,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get organization members
   * @method GET /organizations/{id}/members
   */
  getOrganizationMembers = async ({
    id,
    page,
    pageSize,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/members`;
    const params = this.cleanParams({ page, pageSize, lite });
    return this.request(endpoint, { method: "GET", params });
  };
};
var OrganizationsResource = class extends BaseResource {
  /**
   * Get a service account
   * @method GET /organizations/{id}/service-accounts/{accountId}
   */
  getServiceAccount = async ({
    id,
    accountId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/service-accounts/${encodeURIComponent(String(accountId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get organization service accounts
   * @method GET /organizations/{id}/service-accounts
   */
  listServiceAccounts = async ({
    id
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/service-accounts`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get organization by slug
   * @method GET /organizations/by-slug/{slug}
   */
  getOrganizationBySlug = async ({
    slug
  }) => {
    const endpoint = `/organizations/by-slug/${encodeURIComponent(String(slug))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get an organization by ID
   * @method GET /organizations/{id}
   */
  getOrganization = async ({
    id
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectAppsResource = class extends BaseResource {
  /**
   * Get a project app by slug
   * @method GET /organizations/{id}/projects/{projectId}/apps/by-slug/{appSlug}
   */
  getProjectAppBySlug = async ({
    id,
    projectId,
    appSlug
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/by-slug/${encodeURIComponent(String(appSlug))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get a project app by ID
   * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}
   */
  getProjectApp = async ({
    id,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get deleted apps in trash
   * @method GET /organizations/{id}/projects/{projectId}/apps/trash
   */
  getDeletedProjectApps = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/trash`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get apps in a project
   * @method GET /organizations/{id}/projects/{projectId}/apps
   */
  getProjectApps = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectBrandingResource = class extends BaseResource {
  /**
   * Get project branding
   * @method GET /organizations/{id}/projects/{projectId}/brandings/{brandingId}
   */
  getProjectBranding = async ({
    id,
    projectId,
    brandingId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/brandings/${encodeURIComponent(String(brandingId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get project brandings
   * @method GET /organizations/{id}/projects/{projectId}/brandings
   */
  listProjectBrandings = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/brandings`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectDomainsResource = class extends BaseResource {
  /**
   * Get domain verification instructions
   * @method GET /organizations/{id}/projects/{projectId}/domains/{domainId}/verification
   */
  getDomainVerificationInstructions = async ({
    id,
    projectId,
    domainId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/domains/${encodeURIComponent(String(domainId))}/verification`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get all domains for a project
   * @method GET /organizations/{id}/projects/{projectId}/domains
   */
  listProjectDomains = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/domains`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectFilesResource = class extends BaseResource {
  /**
   * Get all places where a file is referenced
   * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/references
   */
  getFileReferences = async ({
    id,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/references`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get a file folder
   * @method GET /organizations/{id}/projects/{projectId}/files/folders/{folderId}
   */
  getFileFolder = async ({
    id,
    projectId,
    folderId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Replace file content
   * @method PUT /organizations/{id}/projects/{projectId}/files/{fileId}/content
   */
  replaceFileContent = async ({
    id,
    projectId,
    fileId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/content`;
    return this.request(endpoint, { method: "PUT", data });
  };
  /**
   * Read file content
   * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/open
   */
  openFile = async ({
    id,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/open`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get a file
   * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}
   */
  getFile = async ({
    id,
    projectId,
    fileId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get file folders in a project
   * @method GET /organizations/{id}/projects/{projectId}/files/folders
   */
  getFileFolders = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/folders`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Search files by content
   * @method GET /organizations/{id}/projects/{projectId}/files/search
   */
  searchFiles = async ({
    id,
    projectId,
    query,
    limit
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/search`;
    const params = this.cleanParams({ query, limit });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get items in trash
   * @method GET /organizations/{id}/projects/{projectId}/files/trash
   */
  listFileTrash = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/trash`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Save a file from text or image content
   * @method POST /organizations/{id}/projects/{projectId}/files/save
   */
  saveFile = async ({
    id,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/save`;
    return this.request(endpoint, { method: "POST", data });
  };
  /**
   * Get files in a project
   * @method GET /organizations/{id}/projects/{projectId}/files
   */
  getFiles = async ({
    id,
    projectId,
    page,
    pageSize,
    search,
    folderId,
    mimeType
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files`;
    const params = this.cleanParams({
      page,
      pageSize,
      search,
      folderId,
      mimeType
    });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectLegalDocumentsResource = class extends BaseResource {
  /**
   * Get a project legal document by ID
   * @method GET /organizations/{id}/projects/{projectId}/legal/{documentId}
   */
  getProjectLegalDocument = async ({
    id,
    projectId,
    documentId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * List project legal documents
   * @method GET /organizations/{id}/projects/{projectId}/legal
   */
  listProjectLegalDocuments = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/legal`;
    return this.request(endpoint, { method: "GET" });
  };
};
var ProjectMembersResource = class extends BaseResource {
  /**
   * Get a project member by ID
   * @method GET /organizations/{id}/projects/{projectId}/members/{memberId}
   */
  getProjectMember = async ({
    id,
    projectId,
    memberId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/members/${encodeURIComponent(String(memberId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get project members
   * @method GET /organizations/{id}/projects/{projectId}/members
   */
  getProjectMembers = async ({
    id,
    projectId,
    page,
    pageSize
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/members`;
    const params = this.cleanParams({ page, pageSize });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectTrashResource = class extends BaseResource {
  /**
   * Get a single trash item
   * @method GET /organizations/{id}/projects/{projectId}/trash/{trashId}
   */
  getProjectTrashItem = async ({
    id,
    projectId,
    trashId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get all items in project trash
   * @method GET /organizations/{id}/projects/{projectId}/trash
   */
  listProjectTrash = async ({
    id,
    projectId,
    type,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/trash`;
    const params = this.cleanParams({ type, page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
};
var ProjectWorkflowsResource = class extends BaseResource {
  /**
   * Get a workflow run and its tasks
   * @method GET /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
   */
  getWorkflowRun = async ({
    id,
    projectId,
    runId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Dismiss a workflow run
   * @method DELETE /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
   */
  dismissWorkflowRun = async ({
    id,
    projectId,
    runId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
    return this.request(endpoint, { method: "DELETE" });
  };
  /**
   * List workflow runs
   * @method GET /organizations/{id}/projects/{projectId}/workflows/runs
   */
  listWorkflowRuns = async ({
    id,
    projectId,
    page,
    pageSize,
    status,
    type,
    includeDismissed
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
    const params = this.cleanParams({
      page,
      pageSize,
      status,
      type,
      includeDismissed
    });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Start a workflow run
   * @method POST /organizations/{id}/projects/{projectId}/workflows/runs
   */
  createWorkflowRun = async ({
    id,
    projectId,
    data
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
    return this.request(endpoint, { method: "POST", data });
  };
};
var ProjectsResource = class extends BaseResource {
  /**
   * Get project by slug
   * @method GET /organizations/{id}/projects/by-slug/{projectSlug}
   */
  getProjectBySlug = async ({
    id,
    projectSlug
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/by-slug/${encodeURIComponent(String(projectSlug))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Search project knowledge
   * @method GET /organizations/{id}/projects/{projectId}/search
   */
  searchProject = async ({
    id,
    projectId,
    query,
    limit,
    sourceTypes
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/search`;
    const params = this.cleanParams({ query, limit, sourceTypes });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get all project URLs
   * @method GET /organizations/{id}/projects/{projectId}/urls
   */
  getProjectUrls = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/urls`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get a project by ID
   * @method GET /organizations/{id}/projects/{projectId}
   */
  getProject = async ({
    id,
    projectId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get projects in an organization
   * @method GET /organizations/{id}/projects
   */
  getProjects = async ({
    id,
    page,
    pageSize,
    search
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects`;
    const params = this.cleanParams({ page, pageSize, search });
    return this.request(endpoint, { method: "GET", params });
  };
};
var WebsiteResource = class extends BaseResource {
  /**
   * Get consent settings
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
   * Get dialog
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
   * Get dialogs
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs
   */
  listWebsiteDialogs = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get custom domain
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
   * Get custom domains
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains
   */
  listWebsiteCustomDomains = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/domains`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get website footer
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
   * Get website footers
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers
   */
  listWebsiteFooters = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get website header
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
   * Get website headers
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers
   */
  listWebsiteHeaders = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get website layout
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
   * Get website layouts
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts
   */
  listWebsiteLayouts = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get website page
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
   * Get website pages
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages
   */
  getWebsitePages = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get blog post
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
   * Get blog posts
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts
   */
  getWebsitePosts = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get website settings
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/settings
   */
  getWebsiteAppSettings = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/settings`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get website sidebar
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
   * Get website sidebars
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars
   */
  listWebsiteSidebars = async ({
    organizationId,
    projectId,
    appId,
    page,
    pageSize,
    search,
    lite
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars`;
    const params = this.cleanParams({ page, pageSize, search, lite });
    return this.request(endpoint, { method: "GET", params });
  };
  /**
   * Get website tags
   * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags
   */
  getWebsiteTags = async ({
    organizationId,
    projectId,
    appId
  }) => {
    const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tags`;
    return this.request(endpoint, { method: "GET" });
  };
  /**
   * Get tracking settings
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
   * Get existing website page URLs
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
  bugReports;
  crm;
  chat;
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
    this.bugReports = new BugReportsResource(this.client);
    this.crm = new CRMResource(this.client);
    this.chat = new ChatResource(this.client);
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
