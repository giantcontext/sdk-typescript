/** @format */
type GiantContextConfig = {
    /** API key (starts with gct_) */
    apiKey: string;
    /** Base URL for the API (default: https://api.giantcontext.com) */
    baseUrl?: string;
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
};
type RequestOptions = {
    method: string;
    data?: unknown;
    params?: Record<string, unknown>;
};
declare class GiantContextError extends Error {
    status: number;
    body: string;
    constructor(status: number, body: string);
}
declare class BaseResource {
    protected client: GiantContextClient;
    constructor(client: GiantContextClient);
    protected request<T>(url: string, options: RequestOptions): Promise<T>;
    protected cleanParams(params: Record<string, unknown>): Record<string, unknown>;
}
/**
 * API Keys API methods
 */
declare class APIKeysResource extends BaseResource {
    /**
     * Get my API keys
     * @method GET /me/api-keys
     */
    listMyApiKeys: () => Promise<{
        data: Array<{
            id: unknown;
            name: unknown;
            keyPrefix: unknown;
            organizationId: unknown;
            createdAt: unknown;
            lastUsedAt: unknown;
            expiresAt: unknown;
        }>;
    }>;
    /**
     * Get organization API keys
     * @method GET /organizations/{id}/api-keys
     */
    listOrganizationApiKeys: ({ id, }: {
        id: string;
    }) => Promise<{
        data: Array<Record<string, unknown>>;
    }>;
}
/**
 * App Members API methods
 */
declare class AppMembersResource extends BaseResource {
    /**
     * Get an app member by ID
     * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members/{memberId}
     */
    getAppMember: ({ id, projectId, appId, memberId, }: {
        id: string;
        projectId: string;
        appId: string;
        memberId: string;
    }) => Promise<{
        id: string;
        projectAppId: string;
        userId: string;
        role: "owner" | "admin" | "editor" | "viewer";
        title?: string;
        invitedBy?: string;
        joinedAt?: string;
        createdAt: string;
        updatedAt: string;
        user?: {
            name: string;
            email: string;
            avatarUrl?: string;
        };
    }>;
    /**
     * Get members of an app
     * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members
     */
    getAppMembers: ({ id, projectId, appId, }: {
        id: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectAppId: unknown;
            userId: unknown;
            role: unknown;
            title?: unknown;
            invitedBy?: unknown;
            joinedAt?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            user?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Bug Reports API methods
 */
declare class BugReportsResource extends BaseResource {
    /**
     * Get my bug reports
     * @method GET /me/bug-reports
     */
    listMyBugReports: () => Promise<{
        data: Array<{
            id: unknown;
            signature: unknown;
            title: unknown;
            description: unknown;
            steps_to_reproduce: unknown;
            expected_behavior: unknown;
            actual_behavior: unknown;
            source: unknown;
            status: unknown;
            severity: unknown;
            browser_info: unknown;
            page_url: unknown;
            report_count: unknown;
            created_at: unknown;
            updated_at: unknown;
            github_issue_url: unknown;
            github_issue_number: unknown;
        }>;
    }>;
    /**
     * Get comments for a bug report
     * @method GET /me/bug-reports/{id}/comments
     */
    getBugReportComments: ({ id, }: {
        id: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            comment: unknown;
            author: unknown;
            createdAt: unknown;
            source: unknown;
        }>;
    }>;
}
/**
 * CRM API methods
 */
declare class CRMResource extends BaseResource {
    /**
     * Get activity
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities/{activityId}
     */
    getCrmActivity: ({ organizationId, projectId, appId, activityId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        activityId: string;
    }) => Promise<{
        id: string;
        appId: string;
        contactId?: string | unknown;
        companyId?: string | unknown;
        source?: string | unknown;
        description: string;
        data: Record<string, unknown>;
        createdAt: string;
        contact: {
            id: string;
            firstName: string;
            lastName: string;
        } | unknown;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Get activities
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
     */
    getCrmActivitiesList: ({ organizationId, projectId, appId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            contactId?: unknown;
            companyId?: unknown;
            source?: unknown;
            description: unknown;
            data: unknown;
            createdAt: unknown;
            contact: unknown;
            company: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Log activity
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
     */
    logCrmActivity: ({ organizationId, projectId, appId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        data: {
            description: string;
            source?: string;
            contactId?: string;
            companyId?: string;
            data?: Record<string, unknown>;
        };
    }) => Promise<unknown>;
    /**
     * Get activities for a company
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities
     */
    getCrmCompanyActivities: ({ organizationId, projectId, appId, companyId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        companyId: string;
    }) => Promise<Array<{
        id: string;
        appId: string;
        contactId?: string | unknown;
        companyId?: string | unknown;
        source?: string | unknown;
        description: string;
        data: Record<string, unknown>;
        createdAt: string;
        contact: {
            id: unknown;
            firstName: unknown;
            lastName: unknown;
        } | unknown;
        company: {
            id: unknown;
            name: unknown;
        } | unknown;
    }>>;
    /**
     * Get contacts for a company
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts
     */
    getCrmCompanyContacts: ({ organizationId, projectId, appId, companyId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        companyId: string;
    }) => Promise<Array<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<unknown>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: unknown;
            name: unknown;
        } | unknown;
    }>>;
    /**
     * Get company
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}
     */
    getCrmCompany: ({ organizationId, projectId, appId, companyId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        companyId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        website?: string | unknown;
        industry?: string | unknown;
        size?: "1-10" | "11-50" | "51-200" | "201-500" | "500+" | unknown;
        annualRevenue?: number | unknown;
        phone?: string | unknown;
        email?: string | unknown;
        address: {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            postalCode?: string;
        };
        properties: Record<string, unknown>;
        tags: Array<string>;
        contactCount?: number;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get companies
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies
     */
    getCrmCompaniesList: ({ organizationId, projectId, appId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            website?: unknown;
            industry?: unknown;
            size?: unknown;
            annualRevenue?: unknown;
            phone?: unknown;
            email?: unknown;
            address: unknown;
            properties: unknown;
            tags: unknown;
            contactCount?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get activities for a contact
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities
     */
    getCrmContactActivities: ({ organizationId, projectId, appId, contactId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
    }) => Promise<Array<{
        id: string;
        appId: string;
        contactId?: string | unknown;
        companyId?: string | unknown;
        source?: string | unknown;
        description: string;
        data: Record<string, unknown>;
        createdAt: string;
        contact: {
            id: unknown;
            firstName: unknown;
            lastName: unknown;
        } | unknown;
        company: {
            id: unknown;
            name: unknown;
        } | unknown;
    }>>;
    /**
     * Set contact field
     * @method PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/fields
     */
    setCrmContactField: ({ organizationId, projectId, appId, contactId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
        data: {
            key: string;
            value: unknown;
        };
    }) => Promise<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<string>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Get contact
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
     */
    getCrmContact: ({ organizationId, projectId, appId, contactId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
    }) => Promise<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<string>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Update contact
     * @method PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
     */
    updateCrmContact: ({ organizationId, projectId, appId, contactId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
        data: {
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            title?: string;
            department?: string;
            companyId?: string;
            status?: "active" | "inactive" | "archived";
            source?: "referral" | "website" | "cold_call" | "event" | "other";
            properties?: Record<string, unknown>;
            tags?: Array<string>;
            locale?: string | unknown;
        };
    }) => Promise<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<string>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Tag contact
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags
     */
    tagCrmContact: ({ organizationId, projectId, appId, contactId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
        data: {
            tag: string;
        };
    }) => Promise<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<string>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Untag contact
     * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags
     */
    untagCrmContact: ({ organizationId, projectId, appId, contactId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
        data: {
            tag: string;
        };
    }) => Promise<{
        id: string;
        appId: string;
        companyId?: string | unknown;
        firstName: string;
        lastName: string;
        email?: string | unknown;
        phone?: string | unknown;
        title?: string | unknown;
        department?: string | unknown;
        status: "active" | "inactive" | "archived";
        source?: "referral" | "website" | "cold_call" | "event" | "other" | unknown;
        properties: Record<string, unknown>;
        tags: Array<string>;
        emailSubscribed: boolean;
        locale?: string | unknown;
        lastActivityAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
        company: {
            id: string;
            name: string;
        } | unknown;
    }>;
    /**
     * Get contacts
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
     */
    getCrmContactsList: ({ organizationId, projectId, appId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            companyId?: unknown;
            firstName: unknown;
            lastName: unknown;
            email?: unknown;
            phone?: unknown;
            title?: unknown;
            department?: unknown;
            status: unknown;
            source?: unknown;
            properties: unknown;
            tags: unknown;
            emailSubscribed: unknown;
            locale?: unknown;
            lastActivityAt?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            company: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Create contact
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
     */
    createCrmContact: ({ organizationId, projectId, appId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        data: {
            firstName: string;
            lastName: string;
            email?: string;
            phone?: string;
            title?: string;
            department?: string;
            companyId?: string;
            status?: "active" | "inactive" | "archived";
            source?: "referral" | "website" | "cold_call" | "event" | "other";
            properties?: Record<string, unknown>;
            tags?: Array<string>;
            locale?: string | unknown;
        };
    }) => Promise<unknown>;
}
/**
 * Chat API methods
 */
declare class ChatResource extends BaseResource {
    /**
     * Get chat conversation with paginated messages
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations/{conversationId}
     */
    getChatConversation: ({ organizationId, projectId, appId, conversationId, cursor, cursorId, direction, limit, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        conversationId: string;
        cursor?: string;
        cursorId?: string;
        direction?: string;
        limit?: string;
    }) => Promise<{
        id: string;
        projectId?: string | unknown;
        userId?: string | unknown;
        visitorId?: string | unknown;
        title?: string | unknown;
        positiveFeedbackCount?: number;
        negativeFeedbackCount?: number;
        escalationCount?: number;
        latestEscalationStatus?: "collecting_contact" | "collecting_summary" | "submitted" | "cancelled" | unknown;
        createdAt: string;
        updatedAt: string;
        messages: Array<{
            id: unknown;
            conversationId: unknown;
            role: unknown;
            content: unknown;
            toolCalls?: unknown;
            sources?: unknown;
            feedback?: unknown;
            createdAt: unknown;
        }>;
        escalations: Array<{
            id: unknown;
            status: unknown;
            email?: unknown;
            submittedAt?: unknown;
            visitorEmail?: unknown;
            summary?: unknown;
            currentUrl?: unknown;
            notificationSentAt?: unknown;
            notificationError?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        messageCount: number;
        hasMore: boolean;
    }>;
    /**
     * Get all chat conversations
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations
     */
    listChatConversations: ({ organizationId, projectId, appId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId?: unknown;
            userId?: unknown;
            visitorId?: unknown;
            title?: unknown;
            positiveFeedbackCount?: unknown;
            negativeFeedbackCount?: unknown;
            escalationCount?: unknown;
            latestEscalationStatus?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Developers API methods
 */
declare class DevelopersResource extends BaseResource {
    /**
     * Get developer doc category
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
     */
    getDevelopersDocCategory: ({ organizationId, projectId, appId, categoryId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        categoryId: string;
    }) => Promise<Record<string, unknown>>;
    /**
     * Get developer doc categories
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
     */
    listDevelopersDocCategories: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<Array<Record<string, unknown>>>;
    /**
     * Get developer doc
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}
     */
    getDevelopersDoc: ({ organizationId, projectId, appId, docId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        docId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        title?: unknown;
        slug: string;
        content?: unknown;
        excerpt?: unknown;
        status: "draft" | "published";
        order: number;
        seo?: {
            title?: string | Record<string, unknown> | unknown;
            description?: string | Record<string, unknown> | unknown;
            image?: string | unknown;
        };
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string | unknown;
        categoryIds?: Array<string>;
        url?: string;
    }>;
    /**
     * Get developer docs
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs
     */
    listDevelopersDocs: ({ organizationId, projectId, appId, page, pageSize, categoryId, status, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        categoryId?: string;
        status?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            title?: unknown;
            slug: unknown;
            content?: unknown;
            excerpt?: unknown;
            status: unknown;
            order: unknown;
            seo?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            publishedAt?: unknown;
            categoryIds?: unknown;
            url?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * List developer sync logs
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs
     */
    listDevelopersSyncLogs: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        logs: Array<{
            id: unknown;
            source: unknown;
            eventType: unknown;
            language: unknown;
            message: unknown;
            commitSha: unknown;
            metadata: unknown;
            createdAt: unknown;
        }>;
        openapiLastSyncedAt: string | unknown;
        sdkLastSyncedAt: string | unknown;
    }>;
}
/**
 * Drafts API methods
 */
declare class DraftsResource extends BaseResource {
    /**
     * Generate AI content draft
     * @method POST /drafts/generate
     */
    generateDraft: ({ data, }: {
        data: {
            organizationId: string;
            projectId: string;
            prompt: string;
            appId?: string;
            contentType?: string;
            resourceId?: string;
            draftId?: string;
            items?: Array<{
                contentType: unknown;
                prompt: unknown;
            }>;
        };
    }) => Promise<{
        draftId: string;
        status: unknown;
    }>;
    /**
     * Create an edit draft
     * @method POST /drafts/edit
     */
    editDraft: ({ data, }: {
        data: {
            organizationId: string;
            projectId: string;
            contentType: string;
            resourceId: string;
            prompt?: string;
        };
    }) => Promise<{
        draftId: string;
        status: unknown;
    }>;
    /**
     * Unarchive a draft
     * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/unarchive
     */
    unarchiveDraft: ({ id, projectId, draftId, }: {
        id: string;
        projectId: string;
        draftId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string | unknown;
        name?: string | unknown;
        prompt: string;
        status: unknown;
        aiResponse?: string | unknown;
        toolCalls?: Array<unknown>;
        sources?: Array<unknown>;
        createdResourceId?: string | unknown;
        contentType?: string | unknown;
        createdResourceType?: string | unknown;
        rejectionReason?: string | unknown;
        errorMessage?: string | unknown;
        content?: unknown | unknown;
        previewImageUrl?: string | unknown;
        qualityScore?: number | unknown;
        qualityIssues?: Array<unknown> | unknown;
        createdBy?: string | unknown;
        reviewedBy?: string | unknown;
        reviewedAt?: string | unknown;
        appSlug?: string | unknown;
        isEdit?: boolean;
        itemContentTypes?: Array<string>;
        items?: Array<{
            id: unknown;
            draftId: unknown;
            contentType: unknown;
            resourceTable: unknown;
            resourceId: unknown;
            sourceId?: unknown;
            position: unknown;
            status: unknown;
            name?: unknown;
            previewImageUrl?: unknown;
            metadata?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        itemCount?: number;
        archivedAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Archive a draft
     * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/archive
     */
    archiveDraft: ({ id, projectId, draftId, }: {
        id: string;
        projectId: string;
        draftId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string | unknown;
        name?: string | unknown;
        prompt: string;
        status: unknown;
        aiResponse?: string | unknown;
        toolCalls?: Array<unknown>;
        sources?: Array<unknown>;
        createdResourceId?: string | unknown;
        contentType?: string | unknown;
        createdResourceType?: string | unknown;
        rejectionReason?: string | unknown;
        errorMessage?: string | unknown;
        content?: unknown | unknown;
        previewImageUrl?: string | unknown;
        qualityScore?: number | unknown;
        qualityIssues?: Array<unknown> | unknown;
        createdBy?: string | unknown;
        reviewedBy?: string | unknown;
        reviewedAt?: string | unknown;
        appSlug?: string | unknown;
        isEdit?: boolean;
        itemContentTypes?: Array<string>;
        items?: Array<{
            id: unknown;
            draftId: unknown;
            contentType: unknown;
            resourceTable: unknown;
            resourceId: unknown;
            sourceId?: unknown;
            position: unknown;
            status: unknown;
            name?: unknown;
            previewImageUrl?: unknown;
            metadata?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        itemCount?: number;
        archivedAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get a draft by ID
     * @method GET /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
     */
    getDraft: ({ id, projectId, draftId, }: {
        id: string;
        projectId: string;
        draftId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string | unknown;
        name?: string | unknown;
        prompt: string;
        status: unknown;
        aiResponse?: string | unknown;
        toolCalls?: Array<unknown>;
        sources?: Array<unknown>;
        createdResourceId?: string | unknown;
        contentType?: string | unknown;
        createdResourceType?: string | unknown;
        rejectionReason?: string | unknown;
        errorMessage?: string | unknown;
        content?: unknown | unknown;
        previewImageUrl?: string | unknown;
        qualityScore?: number | unknown;
        qualityIssues?: Array<unknown> | unknown;
        createdBy?: string | unknown;
        reviewedBy?: string | unknown;
        reviewedAt?: string | unknown;
        appSlug?: string | unknown;
        isEdit?: boolean;
        itemContentTypes?: Array<string>;
        items?: Array<{
            id: unknown;
            draftId: unknown;
            contentType: unknown;
            resourceTable: unknown;
            resourceId: unknown;
            sourceId?: unknown;
            position: unknown;
            status: unknown;
            name?: unknown;
            previewImageUrl?: unknown;
            metadata?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        itemCount?: number;
        archivedAt?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Delete a draft
     * @method DELETE /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
     */
    deleteDraft: ({ id, projectId, draftId, }: {
        id: string;
        projectId: string;
        draftId: string;
    }) => Promise<{
        success: boolean;
        message?: string;
    }>;
    /**
     * List drafts for a project
     * @method GET /organizations/{id}/projects/{projectId}/mind/drafts
     */
    listDrafts: ({ id, projectId, page, pageSize, lite, includeArchived, }: {
        id: string;
        projectId: string;
        page?: string;
        pageSize?: string;
        lite?: string;
        includeArchived?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            organizationId: unknown;
            projectId: unknown;
            appId?: unknown;
            name?: unknown;
            prompt: unknown;
            status: unknown;
            aiResponse?: unknown;
            toolCalls?: unknown;
            sources?: unknown;
            createdResourceId?: unknown;
            contentType?: unknown;
            createdResourceType?: unknown;
            rejectionReason?: unknown;
            errorMessage?: unknown;
            content?: unknown;
            previewImageUrl?: unknown;
            qualityScore?: unknown;
            qualityIssues?: unknown;
            createdBy?: unknown;
            reviewedBy?: unknown;
            reviewedAt?: unknown;
            appSlug?: unknown;
            isEdit?: unknown;
            itemContentTypes?: unknown;
            items?: unknown;
            itemCount?: unknown;
            archivedAt?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Email API methods
 */
declare class EmailResource extends BaseResource {
    /**
     * Send transactional email
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/actions/send
     */
    sendTransactionalEmail: ({ organizationId, projectId, appId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        data: {
            emailSlug: string;
            to: string;
            variables?: Record<string, unknown>;
            locale?: string;
            skipTracking?: boolean;
        };
    }) => Promise<{
        success: boolean;
        messageId?: string;
        error?: string;
    }>;
    /**
     * Contact email timeline
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/contacts/{contactId}/timeline
     */
    getContactEmailTimeline: ({ organizationId, projectId, appId, contactId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        contactId: string;
    }) => Promise<{
        contactId: string;
        draftId: string | unknown;
        entries: Array<{
            send: unknown;
            emailName: unknown;
            emailSlug: unknown;
            stats: unknown;
        }>;
    }>;
    /**
     * Get email template
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
     */
    getEmail: ({ organizationId, projectId, appId, emailId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        emailId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        slug: string;
        subject?: unknown | unknown;
        triggerDescription?: string | unknown;
        status: "draft" | "published";
        content?: Array<unknown>;
        compiledHtml?: string | unknown;
        headerId?: string | unknown;
        footerId?: string | unknown;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get email recipient
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}
     */
    getEmailRecipient: ({ organizationId, projectId, appId, emailId, recipientId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        emailId: string;
        recipientId: string;
    }) => Promise<{
        id: string;
        emailId: string;
        contactId: string;
        subscribedAt: string;
        unsubscribedAt?: string | unknown;
        unsubscribeReason?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Unsubscribe a recipient
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}/unsubscribe
     */
    unsubscribeEmailRecipient: ({ organizationId, projectId, appId, emailId, recipientId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        emailId: string;
        recipientId: string;
        data: {
            reason?: string;
        };
    }) => Promise<{
        id: string;
        emailId: string;
        contactId: string;
        subscribedAt: string;
        unsubscribedAt?: string | unknown;
        unsubscribeReason?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * List email recipients
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients
     */
    getEmailRecipients: ({ organizationId, projectId, appId, emailId, page, pageSize, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        emailId: string;
        page?: string;
        pageSize?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            emailId: unknown;
            contactId: unknown;
            subscribedAt: unknown;
            unsubscribedAt?: unknown;
            unsubscribeReason?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Subscribe a contact
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients
     */
    subscribeEmailRecipient: ({ organizationId, projectId, appId, emailId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        emailId: string;
        data: {
            contactId: string;
        };
    }) => Promise<unknown>;
    /**
     * Get email templates
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails
     */
    getEmails: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            slug: unknown;
            subject?: unknown;
            triggerDescription?: unknown;
            status: unknown;
            content?: unknown;
            compiledHtml?: unknown;
            headerId?: unknown;
            footerId?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get email footer
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}
     */
    getEmailFooter: ({ organizationId, projectId, appId, footerId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        footerId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get email footers
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers
     */
    listEmailFooters: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get email header
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}
     */
    getEmailHeader: ({ organizationId, projectId, appId, headerId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        headerId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get email headers
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers
     */
    listEmailHeaders: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get email send with events
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}
     */
    getEmailSend: ({ organizationId, projectId, appId, sendId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        sendId: string;
    }) => Promise<{
        send: {
            id: string;
            emailId: string;
            emailName?: string | unknown;
            contactId: string;
            recipientEmail?: string | unknown;
            status: "planned" | "queued" | "sent" | "failed" | "cancelled";
            scheduledFor?: string | unknown;
            sentAt?: string | unknown;
            messageId?: string | unknown;
            trackingToken?: string | unknown;
            locale?: string | unknown;
            error?: string | unknown;
            draftId?: string | unknown;
            metadata?: Record<string, unknown>;
            opens: number;
            clicks: number;
            bounced: boolean;
            complained: boolean;
            unsubscribed: boolean;
            lastOpenedAt: string | unknown;
            lastClickedAt: string | unknown;
            createdAt: string;
            updatedAt: string;
        };
        events: Array<{
            id: unknown;
            sendId: unknown;
            eventType: unknown;
            occurredAt: unknown;
            metadata?: unknown;
            createdAt: unknown;
        }>;
    }>;
    /**
     * Update send
     * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}
     */
    updateEmailSend: ({ organizationId, projectId, appId, sendId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        sendId: string;
        data: {
            status?: "planned" | "queued" | "sent" | "failed" | "cancelled";
            scheduledFor?: string | unknown;
            metadata?: Record<string, unknown>;
        };
    }) => Promise<{
        id: string;
        emailId: string;
        emailName?: string | unknown;
        contactId: string;
        recipientEmail?: string | unknown;
        status: "planned" | "queued" | "sent" | "failed" | "cancelled";
        scheduledFor?: string | unknown;
        sentAt?: string | unknown;
        messageId?: string | unknown;
        trackingToken?: string | unknown;
        locale?: string | unknown;
        error?: string | unknown;
        draftId?: string | unknown;
        metadata?: Record<string, unknown>;
        opens: number;
        clicks: number;
        bounced: boolean;
        complained: boolean;
        unsubscribed: boolean;
        lastOpenedAt: string | unknown;
        lastClickedAt: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * List email sends
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
     */
    getEmailSends: ({ organizationId, projectId, appId, page, pageSize, emailId, contactId, status, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        emailId?: string;
        contactId?: string;
        status?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            emailId: unknown;
            emailName?: unknown;
            contactId: unknown;
            recipientEmail?: unknown;
            status: unknown;
            scheduledFor?: unknown;
            sentAt?: unknown;
            messageId?: unknown;
            trackingToken?: unknown;
            locale?: unknown;
            error?: unknown;
            draftId?: unknown;
            metadata?: unknown;
            opens: unknown;
            clicks: unknown;
            bounced: unknown;
            complained: unknown;
            unsubscribed: unknown;
            lastOpenedAt: unknown;
            lastClickedAt: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Create a planned send
     * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
     */
    createEmailSend: ({ organizationId, projectId, appId, data, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        data: {
            emailId: string;
            contactId: string;
            status?: "planned" | "queued" | "sent" | "failed" | "cancelled";
            scheduledFor?: string;
            locale?: string;
            metadata?: Record<string, unknown>;
        };
    }) => Promise<unknown>;
}
/**
 * Feature Requests API methods
 */
declare class FeatureRequestsResource extends BaseResource {
    /**
     * Get popular feature requests
     * @method GET /me/feature-requests/popular
     */
    getPopularFeatureRequests: ({ limit, offset, status, }: {
        limit?: string;
        offset?: string;
        status?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            title: unknown;
            description: unknown;
            status: unknown;
            priority: unknown;
            voteCount: unknown;
            commentCount: unknown;
            hasVoted: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        total: number;
    }>;
    /**
     * Get my feature requests
     * @method GET /me/feature-requests
     */
    listMyFeatureRequests: () => Promise<{
        data: Array<{
            id: unknown;
            signature: unknown;
            title: unknown;
            description: unknown;
            source: unknown;
            status: unknown;
            priority: unknown;
            vote_count: unknown;
            created_at: unknown;
            updated_at: unknown;
            github_issue_url: unknown;
            github_issue_number: unknown;
        }>;
    }>;
    /**
     * Get comments for a feature request
     * @method GET /me/feature-requests/{id}/comments
     */
    getFeatureRequestComments: ({ id, }: {
        id: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            comment: unknown;
            author: unknown;
            createdAt: unknown;
            source: unknown;
        }>;
    }>;
}
/**
 * Forms API methods
 */
declare class FormsResource extends BaseResource {
    /**
     * Get form
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
     */
    getForm: ({ organizationId, projectId, appId, formId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        formId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        slug: string;
        description?: string | unknown;
        fields: Array<{
            id: unknown;
            type: unknown;
            name: unknown;
            label: unknown;
            placeholder?: unknown;
            helpText?: unknown;
            defaultValue?: unknown;
            options?: unknown;
            validation?: unknown;
            width?: unknown;
            order?: unknown;
        }>;
        content: Array<unknown>;
        settings: {
            submitButtonText?: string;
            successMessage?: string | Record<string, unknown>;
            gcUrlRedirect?: string;
            hideFormOnComplete?: boolean;
            closeDialogOnComplete?: boolean;
            notifyEmail?: string;
            sendConfirmation?: boolean;
            confirmationSubject?: string;
            confirmationMessage?: string;
            maxSubmissions?: number;
            submissionLimit?: "none" | "once_per_user";
            theme?: "default" | "minimal" | "card";
            tags?: Array<unknown>;
            source?: string;
        };
        isActive: boolean;
        submissionCount?: number;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get form submission
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions/{submissionId}
     */
    getFormSubmission: ({ organizationId, projectId, appId, formId, submissionId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        formId: string;
        submissionId: string;
    }) => Promise<{
        id: string;
        formId: string;
        data: Record<string, unknown>;
        metadata?: {
            userAgent?: string;
            ip?: string;
            referer?: string;
            submittedAt?: string;
            tags?: Array<unknown>;
            source?: string;
        };
        createdAt: string;
    }>;
    /**
     * Get form submissions
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions
     */
    getFormSubmissions: ({ organizationId, projectId, appId, formId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        formId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            formId: unknown;
            data: unknown;
            metadata?: unknown;
            createdAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get forms
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms
     */
    getFormsList: ({ organizationId, projectId, appId, page, pageSize, search, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            slug: unknown;
            description?: unknown;
            fields: unknown;
            content: unknown;
            settings: unknown;
            isActive: unknown;
            submissionCount?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Health API methods
 */
declare class HealthResource extends BaseResource {
    /**
     * Verify LLM connectivity
     * @method GET /health/echo
     */
    getHealthEcho: () => Promise<{
        status: string;
        message?: string;
        error?: string;
    }>;
}
/**
 * Ideas API methods
 */
declare class IdeasResource extends BaseResource {
    /**
     * Approve a Mind idea
     * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/approve
     */
    approveIdea: ({ id, projectId, ideaId, data, }: {
        id: string;
        projectId: string;
        ideaId: string;
        data: {
            contentType?: string;
            prompt?: string;
        };
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string;
        sourceChunkId?: string;
        sourceFileId?: string;
        contentType?: string;
        targetContentType?: string;
        operationKey?: string;
        name?: string;
        description?: string;
        rationale?: string;
        outline?: unknown;
        priority: "high" | "medium" | "low";
        similarityScore?: number;
        status: "pending" | "approved" | "dismissed" | "drafted";
        draftId?: string;
        mindRunId?: string;
        dismissedReason?: string;
        dismissedBy?: string;
        metadata?: unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Dismiss a Mind idea
     * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/dismiss
     */
    dismissIdea: ({ id, projectId, ideaId, data, }: {
        id: string;
        projectId: string;
        ideaId: string;
        data: {
            reason?: string;
        };
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string;
        sourceChunkId?: string;
        sourceFileId?: string;
        contentType?: string;
        targetContentType?: string;
        operationKey?: string;
        name?: string;
        description?: string;
        rationale?: string;
        outline?: unknown;
        priority: "high" | "medium" | "low";
        similarityScore?: number;
        status: "pending" | "approved" | "dismissed" | "drafted";
        draftId?: string;
        mindRunId?: string;
        dismissedReason?: string;
        dismissedBy?: string;
        metadata?: unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get a Mind idea
     * @method GET /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}
     */
    getIdea: ({ id, projectId, ideaId, }: {
        id: string;
        projectId: string;
        ideaId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        projectId: string;
        appId?: string;
        sourceChunkId?: string;
        sourceFileId?: string;
        contentType?: string;
        targetContentType?: string;
        operationKey?: string;
        name?: string;
        description?: string;
        rationale?: string;
        outline?: unknown;
        priority: "high" | "medium" | "low";
        similarityScore?: number;
        status: "pending" | "approved" | "dismissed" | "drafted";
        draftId?: string;
        mindRunId?: string;
        dismissedReason?: string;
        dismissedBy?: string;
        metadata?: unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * List Mind ideas for a project
     * @method GET /organizations/{id}/projects/{projectId}/mind/ideas
     */
    listIdeas: ({ id, projectId, page, pageSize, lite, }: {
        id: string;
        projectId: string;
        page?: string;
        pageSize?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            organizationId: unknown;
            projectId: unknown;
            appId?: unknown;
            sourceChunkId?: unknown;
            sourceFileId?: unknown;
            contentType?: unknown;
            targetContentType?: unknown;
            operationKey?: unknown;
            name?: unknown;
            description?: unknown;
            rationale?: unknown;
            outline?: unknown;
            priority: unknown;
            similarityScore?: unknown;
            status: unknown;
            draftId?: unknown;
            mindRunId?: unknown;
            dismissedReason?: unknown;
            dismissedBy?: unknown;
            metadata?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Trigger Mind ideation for a project
     * @method POST /organizations/{id}/projects/{projectId}/mind/ideas
     */
    triggerIdeation: ({ id, projectId, data, }: {
        id: string;
        projectId: string;
        data: {
            target?: {
                contentType: string;
                operationKey: string;
            };
        };
    }) => Promise<{
        ideas: Array<unknown>;
        count: number;
    }>;
}
/**
 * Invitations API methods
 */
declare class InvitationsResource extends BaseResource {
    /**
     * Get an invitation by ID
     * @method GET /organizations/{id}/invitations/{invitationId}
     */
    getOrganizationInvitation: ({ id, invitationId, }: {
        id: string;
        invitationId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        email: string;
        role: "owner" | "admin" | "member" | "viewer" | "collaborator";
        invitedBy: string;
        acceptedAt?: string;
        expiresAt: string;
        createdAt: string;
        organization?: {
            name: string;
            slug: string;
        };
        inviter?: {
            name: string;
            email: string;
        };
    }>;
    /**
     * Get organization invitations
     * @method GET /organizations/{id}/invitations
     */
    getOrganizationInvitations: ({ id, }: {
        id: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            organizationId: unknown;
            email: unknown;
            role: unknown;
            invitedBy: unknown;
            acceptedAt?: unknown;
            expiresAt: unknown;
            createdAt: unknown;
            organization?: unknown;
            inviter?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * KB API methods
 */
declare class KBResource extends BaseResource {
    /**
     * Get KB article
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
     */
    getKbArticle: ({ organizationId, projectId, appId, articleId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        articleId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        title?: unknown;
        slug: string;
        content?: unknown;
        excerpt?: unknown;
        status: "draft" | "published";
        order: number;
        seo?: {
            title?: string | Record<string, unknown> | unknown;
            description?: string | Record<string, unknown> | unknown;
            image?: string | unknown;
        };
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string | unknown;
        categoryIds?: Array<string>;
        url?: string;
    }>;
    /**
     * Get KB articles
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles
     */
    listKbArticles: ({ organizationId, projectId, appId, page, pageSize, categoryId, status, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        categoryId?: string;
        status?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            title?: unknown;
            slug: unknown;
            content?: unknown;
            excerpt?: unknown;
            status: unknown;
            order: unknown;
            seo?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            publishedAt?: unknown;
            categoryIds?: unknown;
            url?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get KB category
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
     */
    getKbCategory: ({ organizationId, projectId, appId, categoryId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        categoryId: string;
    }) => Promise<Record<string, unknown>>;
    /**
     * Get KB categories
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
     */
    listKbCategories: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<Array<Record<string, unknown>>>;
    /**
     * Get KB settings
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/settings
     */
    getKbSettings: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        rootUrl?: string;
        brandingId?: string | unknown;
    }>;
}
/**
 * Me API methods
 */
declare class MeResource extends BaseResource {
    /**
     * Get my suspension appeal messages
     * @method GET /me/suspension-messages
     */
    getMySuspensionMessages: () => Promise<Array<{
        id: string;
        userId: string;
        authorType: "user" | "admin";
        authorId?: string;
        authorName?: string;
        message: string;
        createdAt: string;
    }>>;
    /**
     * Get my notifications
     * @method GET /me/notifications
     */
    getMyNotifications: ({ page, pageSize, search, status, }: {
        page?: string;
        pageSize?: string;
        search?: string;
        status?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            userId: unknown;
            title: unknown;
            body?: unknown;
            type: unknown;
            status: unknown;
            link?: unknown;
            data: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get organizations I belong to
     * @method GET /me/organizations
     */
    getMyOrganizations: () => Promise<Array<Record<string, unknown>>>;
    /**
     * Get my pending invitations
     * @method GET /me/invitations
     */
    getMyInvitations: () => Promise<{
        data: Array<{
            id: unknown;
            organizationId: unknown;
            email: unknown;
            role: unknown;
            invitedBy: unknown;
            acceptedAt?: unknown;
            expiresAt: unknown;
            createdAt: unknown;
            organization?: unknown;
            inviter?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get my activity history
     * @method GET /me/activities
     */
    getMyActivities: ({ page, pageSize, lite, }: {
        page?: string;
        pageSize?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            actorId?: unknown;
            actorType: unknown;
            actorName?: unknown;
            actorEmail?: unknown;
            action: unknown;
            resourceType: unknown;
            resourceId?: unknown;
            resourceName?: unknown;
            organizationId?: unknown;
            organizationName?: unknown;
            metadata: unknown;
            createdAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get current user profile and permissions
     * @method GET /me
     */
    getMe: () => Promise<{
        id: string;
        firebaseUid: string;
        name: string;
        email: string;
        role: "admin" | "editor" | "viewer";
        isActive: boolean;
        bio?: string;
        avatarUrl?: string;
        phone?: string;
        timezone?: string;
        locale?: string;
        themeMode?: "light" | "dark" | "system";
        permissions: Array<string>;
        organizations: Array<{
            id: unknown;
            name: unknown;
            slug: unknown;
            logoUrl?: unknown;
            memberRole: unknown;
        }>;
        emailNotifications: boolean;
        pushNotifications: boolean;
        marketingEmails: boolean;
        suspendedAt?: string;
        suspendedUntil?: string;
        suspensionReason?: string;
        onboardingCompletedAt?: string;
        legalAcceptanceRequired: boolean;
        createdAt: string;
        updatedAt: string;
    }>;
}
/**
 * Notifications API methods
 */
declare class NotificationsResource extends BaseResource {
    /**
     * Send a notification
     * @method POST /notifications/send
     */
    sendNotification: ({ data, }: {
        data: {
            userId?: string;
            email?: string;
            organizationId?: string;
            projectId?: string;
            channels: Array<unknown>;
            content: {
                title: string;
                body?: string;
                type?: "info" | "success" | "warning" | "error";
                link?: string;
                data?: Record<string, unknown>;
            };
            force?: boolean;
        };
    }) => Promise<{
        delivered: number;
        skipped: number;
        failed: number;
    }>;
}
/**
 * Organization Members API methods
 */
declare class OrganizationMembersResource extends BaseResource {
    /**
     * Get member project memberships
     * @method GET /organizations/{id}/members/{memberId}/project-memberships
     */
    getMemberProjectMemberships: ({ id, memberId, }: {
        id: string;
        memberId: string;
    }) => Promise<Array<{
        projectId: string;
        projectName: string;
        projectSlug: string;
        membershipId: string | unknown;
        role: "owner" | "admin" | "editor" | "viewer" | unknown;
        joinedAt: string | unknown;
    }>>;
    /**
     * Get member activities
     * @method GET /organizations/{id}/members/{memberId}/activities
     */
    getOrganizationMemberActivities: ({ id, memberId, page, pageSize, lite, }: {
        id: string;
        memberId: string;
        page?: string;
        pageSize?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            actorId?: unknown;
            actorType: unknown;
            actorName?: unknown;
            actorEmail?: unknown;
            action: unknown;
            resourceType: unknown;
            resourceId?: unknown;
            resourceName?: unknown;
            organizationId?: unknown;
            organizationName?: unknown;
            metadata: unknown;
            createdAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get a member by ID
     * @method GET /organizations/{id}/members/{memberId}
     */
    getOrganizationMember: ({ id, memberId, }: {
        id: string;
        memberId: string;
    }) => Promise<{
        id: string;
        userId: string;
        organizationId: string;
        role: "owner" | "admin" | "member" | "viewer" | "collaborator";
        title?: string;
        invitedBy?: string;
        invitedAt?: string;
        joinedAt?: string;
        createdAt: string;
        updatedAt: string;
        user?: {
            name: string;
            email: string;
            avatarUrl?: string;
            bio?: string;
            phone?: string;
        };
    }>;
    /**
     * Get organization members
     * @method GET /organizations/{id}/members
     */
    getOrganizationMembers: ({ id, page, pageSize, lite, }: {
        id: string;
        page?: string;
        pageSize?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            userId: unknown;
            organizationId: unknown;
            role: unknown;
            title?: unknown;
            invitedBy?: unknown;
            invitedAt?: unknown;
            joinedAt?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            user?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Organizations API methods
 */
declare class OrganizationsResource extends BaseResource {
    /**
     * Get a service account
     * @method GET /organizations/{id}/service-accounts/{accountId}
     */
    getServiceAccount: ({ id, accountId, }: {
        id: string;
        accountId: string;
    }) => Promise<{
        id: string;
        name: string;
        email: string;
        description: string | unknown;
        organizationId: string;
        memberId: string;
        role: "admin" | "member" | "viewer";
        createdAt: string;
        createdBy: string | unknown;
    }>;
    /**
     * Get organization service accounts
     * @method GET /organizations/{id}/service-accounts
     */
    listServiceAccounts: ({ id, }: {
        id: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            name: unknown;
            email: unknown;
            description: unknown;
            organizationId: unknown;
            memberId: unknown;
            role: unknown;
            createdAt: unknown;
            createdBy: unknown;
        }>;
    }>;
    /**
     * Get organization by slug
     * @method GET /organizations/by-slug/{slug}
     */
    getOrganizationBySlug: ({ slug, }: {
        slug: string;
    }) => Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        logoUrl?: string;
        brandColor?: string;
        website?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            country?: string;
        };
        plan: string;
        subscriptionStatus: string;
        trialEndsAt?: string;
        features: Array<string>;
        isActive: boolean;
        suspendedAt?: string;
        suspensionReason?: string;
        ownerId?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get an organization by ID
     * @method GET /organizations/{id}
     */
    getOrganization: ({ id, }: {
        id: string;
    }) => Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        logoUrl?: string;
        brandColor?: string;
        website?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            country?: string;
        };
        plan: string;
        subscriptionStatus: string;
        trialEndsAt?: string;
        features: Array<string>;
        isActive: boolean;
        suspendedAt?: string;
        suspensionReason?: string;
        ownerId?: string;
        createdAt: string;
        updatedAt: string;
    }>;
}
/**
 * Project Apps API methods
 */
declare class ProjectAppsResource extends BaseResource {
    /**
     * Get a project app by slug
     * @method GET /organizations/{id}/projects/{projectId}/apps/by-slug/{appSlug}
     */
    getProjectAppBySlug: ({ id, projectId, appSlug, }: {
        id: string;
        projectId: string;
        appSlug: string;
    }) => Promise<{
        id: string;
        projectId: string;
        appType: unknown;
        name: string;
        slug: string;
        description?: string;
        brandingId: string | unknown;
        robotsTxt: string | unknown;
        isActive: boolean;
        settings: Record<string, unknown>;
        primaryDomain: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get a project app by ID
     * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}
     */
    getProjectApp: ({ id, projectId, appId, }: {
        id: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        appType: unknown;
        name: string;
        slug: string;
        description?: string;
        brandingId: string | unknown;
        robotsTxt: string | unknown;
        isActive: boolean;
        settings: Record<string, unknown>;
        primaryDomain: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get deleted apps in trash
     * @method GET /organizations/{id}/projects/{projectId}/apps/trash
     */
    getDeletedProjectApps: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<Array<{
        id: string;
        projectId: string;
        appType: unknown;
        name: string;
        slug: string;
        description?: string;
        brandingId: string | unknown;
        robotsTxt: string | unknown;
        isActive: boolean;
        settings: Record<string, unknown>;
        primaryDomain: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>>;
    /**
     * Get apps in a project
     * @method GET /organizations/{id}/projects/{projectId}/apps
     */
    getProjectApps: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            appType: unknown;
            name: unknown;
            slug: unknown;
            description?: unknown;
            brandingId: unknown;
            robotsTxt: unknown;
            isActive: unknown;
            settings: unknown;
            primaryDomain: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Project Branding API methods
 */
declare class ProjectBrandingResource extends BaseResource {
    /**
     * Get project branding
     * @method GET /organizations/{id}/projects/{projectId}/brandings/{brandingId}
     */
    getProjectBranding: ({ id, projectId, brandingId, }: {
        id: string;
        projectId: string;
        brandingId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        logoUrl?: string;
        logoDarkUrl?: string;
        faviconUrl?: string;
        colorPrimary?: string;
        colorSecondary?: string;
        colorInfo?: string;
        colorWarning?: string;
        colorSuccess?: string;
        colorError?: string;
        backgroundDark?: string;
        backgroundLight?: string;
        paperDark?: string;
        paperLight?: string;
        fontBody?: string;
        fontHeading?: string;
        borderRadius?: number;
        shadowIntensity?: "none" | "subtle" | "medium" | "strong";
        fontScale?: number;
        headingWeight?: number;
        bodyWeight?: number;
        lineHeight?: "tight" | "normal" | "relaxed";
        letterSpacing?: "tight" | "normal" | "wide";
        spacingScale?: number;
        buttonStyle?: "squared" | "rounded" | "pill";
        inputStyle?: "outlined" | "filled" | "standard";
        cardStyle?: "flat" | "elevated" | "outlined";
        contentDesignBrief?: string;
        imageDesignBrief?: string;
        voiceDesignBrief?: string;
        createdBy?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get project brandings
     * @method GET /organizations/{id}/projects/{projectId}/brandings
     */
    listProjectBrandings: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            logoUrl?: unknown;
            logoDarkUrl?: unknown;
            faviconUrl?: unknown;
            colorPrimary?: unknown;
            colorSecondary?: unknown;
            colorInfo?: unknown;
            colorWarning?: unknown;
            colorSuccess?: unknown;
            colorError?: unknown;
            backgroundDark?: unknown;
            backgroundLight?: unknown;
            paperDark?: unknown;
            paperLight?: unknown;
            fontBody?: unknown;
            fontHeading?: unknown;
            borderRadius?: unknown;
            shadowIntensity?: unknown;
            fontScale?: unknown;
            headingWeight?: unknown;
            bodyWeight?: unknown;
            lineHeight?: unknown;
            letterSpacing?: unknown;
            spacingScale?: unknown;
            buttonStyle?: unknown;
            inputStyle?: unknown;
            cardStyle?: unknown;
            contentDesignBrief?: unknown;
            imageDesignBrief?: unknown;
            voiceDesignBrief?: unknown;
            createdBy?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        total: number;
        page: number;
        limit: number;
    }>;
}
/**
 * Project Domains API methods
 */
declare class ProjectDomainsResource extends BaseResource {
    /**
     * Get domain verification instructions
     * @method GET /organizations/{id}/projects/{projectId}/domains/{domainId}/verification
     */
    getDomainVerificationInstructions: ({ id, projectId, domainId, }: {
        id: string;
        projectId: string;
        domainId: string;
    }) => Promise<{
        hostname: string;
        verificationStatus: unknown;
        dnsRecordName: string | unknown;
        dnsRecordType: string | unknown;
        dnsRecordValue: string | unknown;
        verificationError: string | unknown;
        loadBalancerIp: string | unknown;
    }>;
    /**
     * Get all domains for a project
     * @method GET /organizations/{id}/projects/{projectId}/domains
     */
    listProjectDomains: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<Array<{
        id: string;
        projectId: string;
        appId: string | unknown;
        appType: string | unknown;
        appName: string | unknown;
        appSlug: string | unknown;
        hostname: string;
        isGenerated: boolean;
        isPrimary: boolean;
        isVerified: boolean;
        verificationStatus: unknown | unknown;
        verificationError: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>>;
}
/**
 * Project Files API methods
 */
declare class ProjectFilesResource extends BaseResource {
    /**
     * Get all places where a file is referenced
     * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/references
     */
    getFileReferences: ({ id, projectId, fileId, }: {
        id: string;
        projectId: string;
        fileId: string;
    }) => Promise<Array<{
        type: unknown;
        id: string;
        name: string;
        projectId: string;
    }>>;
    /**
     * Get a file folder
     * @method GET /organizations/{id}/projects/{projectId}/files/folders/{folderId}
     */
    getFileFolder: ({ id, projectId, folderId, }: {
        id: string;
        projectId: string;
        folderId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        slug: string;
        parentId: string | unknown;
        path?: string;
        childCount?: number;
        fileCount?: number;
        createdAt: string;
        updatedAt: string;
        createdBy: string | unknown;
    }>;
    /**
     * Replace file content
     * @method PUT /organizations/{id}/projects/{projectId}/files/{fileId}/content
     */
    replaceFileContent: ({ id, projectId, fileId, data, }: {
        id: string;
        projectId: string;
        fileId: string;
        data: {
            content: string;
        };
    }) => Promise<{
        id: string;
        projectId: string;
        folderId: string | unknown;
        filename: string;
        originalFilename: string;
        mimeType: string;
        sizeBytes: number;
        url: string;
        isPublic: boolean;
        grounding: "fact" | "context" | "style" | "boundary";
        permissionGroup?: string | unknown;
        width?: number;
        height?: number;
        focalPoint?: {
            x: number;
            y: number;
        };
        variants?: {
            thumbnail?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            small?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            medium?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            large?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
        };
        altText?: string;
        caption?: string;
        title?: string;
        uploadedAt: string;
        uploadedBy: string | unknown;
        updatedAt: string;
        compressionStatus?: "pending" | "processing" | "complete" | "failed" | unknown;
        referenceCount?: number;
    }>;
    /**
     * Read file content
     * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/open
     */
    openFile: ({ id, projectId, fileId, }: {
        id: string;
        projectId: string;
        fileId: string;
    }) => Promise<{
        id: string;
        filename: string;
        mimeType: string;
        sizeBytes: number;
        content?: string;
        base64Content?: string;
    }>;
    /**
     * Get a file
     * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}
     */
    getFile: ({ id, projectId, fileId, }: {
        id: string;
        projectId: string;
        fileId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        folderId: string | unknown;
        filename: string;
        originalFilename: string;
        mimeType: string;
        sizeBytes: number;
        url: string;
        isPublic: boolean;
        grounding: "fact" | "context" | "style" | "boundary";
        permissionGroup?: string | unknown;
        width?: number;
        height?: number;
        focalPoint?: {
            x: number;
            y: number;
        };
        variants?: {
            thumbnail?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            small?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            medium?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            large?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
        };
        altText?: string;
        caption?: string;
        title?: string;
        uploadedAt: string;
        uploadedBy: string | unknown;
        updatedAt: string;
        compressionStatus?: "pending" | "processing" | "complete" | "failed" | unknown;
        referenceCount?: number;
    }>;
    /**
     * Get file folders in a project
     * @method GET /organizations/{id}/projects/{projectId}/files/folders
     */
    getFileFolders: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<Array<{
        id: string;
        projectId: string;
        name: string;
        slug: string;
        parentId: string | unknown;
        path?: string;
        childCount?: number;
        fileCount?: number;
        createdAt: string;
        updatedAt: string;
        createdBy: string | unknown;
    }>>;
    /**
     * Search files by content
     * @method GET /organizations/{id}/projects/{projectId}/files/search
     */
    searchFiles: ({ id, projectId, query, limit, }: {
        id: string;
        projectId: string;
        query: string;
        limit?: string;
    }) => Promise<Array<{
        fileId: string;
        filename: string;
        originalFilename: string;
        mimeType: string;
        url: string;
        similarity: number;
        matchingContent: string;
    }>>;
    /**
     * Get items in trash
     * @method GET /organizations/{id}/projects/{projectId}/files/trash
     */
    listFileTrash: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<Array<{
        id: string;
        type: "file" | "folder";
        name: string;
        deletedAt: string;
        deletedBy: string | unknown;
        parentId: string | unknown;
        mimeType?: string;
        sizeBytes?: number;
        url?: string;
    }>>;
    /**
     * Save a file from text or image content
     * @method POST /organizations/{id}/projects/{projectId}/files/save
     */
    saveFile: ({ id, projectId, data, }: {
        id: string;
        projectId: string;
        data: {
            content?: string;
            base64Content?: string;
            filename: string;
            mimeType?: string;
            folderId?: string;
            folderPath?: string;
            title?: string;
            description?: string;
            isPublic?: boolean;
            grounding?: "fact" | "context" | "style" | "boundary";
            permissionGroup?: string;
        };
    }) => Promise<{
        id: string;
        projectId: string;
        folderId: string | unknown;
        filename: string;
        originalFilename: string;
        mimeType: string;
        sizeBytes: number;
        url: string;
        isPublic: boolean;
        grounding: "fact" | "context" | "style" | "boundary";
        permissionGroup?: string | unknown;
        width?: number;
        height?: number;
        focalPoint?: {
            x: number;
            y: number;
        };
        variants?: {
            thumbnail?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            small?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            medium?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
            large?: {
                url: unknown;
                width: unknown;
                height: unknown;
                sizeBytes: unknown;
            };
        };
        altText?: string;
        caption?: string;
        title?: string;
        uploadedAt: string;
        uploadedBy: string | unknown;
        updatedAt: string;
        compressionStatus?: "pending" | "processing" | "complete" | "failed" | unknown;
        referenceCount?: number;
    }>;
    /**
     * Get files in a project
     * @method GET /organizations/{id}/projects/{projectId}/files
     */
    getFiles: ({ id, projectId, page, pageSize, search, folderId, mimeType, }: {
        id: string;
        projectId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        folderId?: string;
        mimeType?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            folderId: unknown;
            filename: unknown;
            originalFilename: unknown;
            mimeType: unknown;
            sizeBytes: unknown;
            url: unknown;
            isPublic: unknown;
            grounding: unknown;
            permissionGroup?: unknown;
            width?: unknown;
            height?: unknown;
            focalPoint?: unknown;
            variants?: unknown;
            altText?: unknown;
            caption?: unknown;
            title?: unknown;
            uploadedAt: unknown;
            uploadedBy: unknown;
            updatedAt: unknown;
            compressionStatus?: unknown;
            referenceCount?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Project Legal Documents API methods
 */
declare class ProjectLegalDocumentsResource extends BaseResource {
    /**
     * Get a project legal document by ID
     * @method GET /organizations/{id}/projects/{projectId}/legal/{documentId}
     */
    getProjectLegalDocument: ({ id, projectId, documentId, }: {
        id: string;
        projectId: string;
        documentId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        type: "tos" | "privacy" | "aup" | "cookie" | "custom";
        version: number;
        content: Record<string, unknown>;
        status: "draft" | "published";
        publishedAt?: string;
        publishedBy?: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * List project legal documents
     * @method GET /organizations/{id}/projects/{projectId}/legal
     */
    listProjectLegalDocuments: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            type: unknown;
            version: unknown;
            content: unknown;
            status: unknown;
            publishedAt?: unknown;
            publishedBy?: unknown;
            createdBy: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Project Members API methods
 */
declare class ProjectMembersResource extends BaseResource {
    /**
     * Get a project member by ID
     * @method GET /organizations/{id}/projects/{projectId}/members/{memberId}
     */
    getProjectMember: ({ id, projectId, memberId, }: {
        id: string;
        projectId: string;
        memberId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        userId: string;
        role: "owner" | "admin" | "editor" | "viewer";
        title?: string;
        invitedBy?: string;
        joinedAt?: string;
        createdAt: string;
        updatedAt: string;
        user?: {
            name: string;
            email: string;
            avatarUrl?: string;
        };
    }>;
    /**
     * Get project members
     * @method GET /organizations/{id}/projects/{projectId}/members
     */
    getProjectMembers: ({ id, projectId, page, pageSize, }: {
        id: string;
        projectId: string;
        page?: string;
        pageSize?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            userId: unknown;
            role: unknown;
            title?: unknown;
            invitedBy?: unknown;
            joinedAt?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            user?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Project Trash API methods
 */
declare class ProjectTrashResource extends BaseResource {
    /**
     * Get a single trash item
     * @method GET /organizations/{id}/projects/{projectId}/trash/{trashId}
     */
    getProjectTrashItem: ({ id, projectId, trashId, }: {
        id: string;
        projectId: string;
        trashId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        entityType: string;
        entityId: string;
        appId: string | unknown;
        name: string;
        thumbnailUrl: string | unknown;
        fileSize: number | unknown;
        mimeType: string | unknown;
        deletedAt: string;
        deletedBy: string | unknown;
        deletedByName: string | unknown;
        expiresAt: string;
        trashBatchId: string | unknown;
    }>;
    /**
     * Get all items in project trash
     * @method GET /organizations/{id}/projects/{projectId}/trash
     */
    listProjectTrash: ({ id, projectId, type, page, pageSize, search, }: {
        id: string;
        projectId: string;
        type?: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            entityType: unknown;
            entityId: unknown;
            appId: unknown;
            name: unknown;
            thumbnailUrl: unknown;
            fileSize: unknown;
            mimeType: unknown;
            deletedAt: unknown;
            deletedBy: unknown;
            deletedByName: unknown;
            expiresAt: unknown;
            trashBatchId: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Project Workflows API methods
 */
declare class ProjectWorkflowsResource extends BaseResource {
    /**
     * Get a workflow run and its tasks
     * @method GET /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
     */
    getWorkflowRun: ({ id, projectId, runId, }: {
        id: string;
        projectId: string;
        runId: string;
    }) => Promise<{
        data: {
            run: {
                id: unknown;
                type: unknown;
                status: unknown;
                organizationId: unknown;
                projectId: unknown;
                userId: unknown;
                title: unknown;
                input: unknown;
                result: unknown;
                error: unknown;
                tasksTotal: unknown;
                tasksCompleted: unknown;
                tasksFailed: unknown;
                startedAt: unknown;
                completedAt: unknown;
                dismissedAt: unknown;
                createdAt: unknown;
                updatedAt: unknown;
            };
            tasks: Array<unknown>;
            steps: Array<unknown>;
        };
    }>;
    /**
     * Dismiss a workflow run
     * @method DELETE /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
     */
    dismissWorkflowRun: ({ id, projectId, runId, }: {
        id: string;
        projectId: string;
        runId: string;
    }) => Promise<{
        success: boolean;
    }>;
    /**
     * List workflow runs
     * @method GET /organizations/{id}/projects/{projectId}/workflows/runs
     */
    listWorkflowRuns: ({ id, projectId, page, pageSize, status, type, includeDismissed, }: {
        id: string;
        projectId: string;
        page?: string;
        pageSize?: string;
        status?: string;
        type?: string;
        includeDismissed?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            type: unknown;
            status: unknown;
            organizationId: unknown;
            projectId: unknown;
            userId: unknown;
            title: unknown;
            input: unknown;
            result: unknown;
            error: unknown;
            tasksTotal: unknown;
            tasksCompleted: unknown;
            tasksFailed: unknown;
            startedAt: unknown;
            completedAt: unknown;
            dismissedAt: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Start a workflow run
     * @method POST /organizations/{id}/projects/{projectId}/workflows/runs
     */
    createWorkflowRun: ({ id, projectId, data, }: {
        id: string;
        projectId: string;
        data: {
            type: string;
            title?: string;
            input?: Record<string, unknown>;
        };
    }) => Promise<unknown>;
}
/**
 * Projects API methods
 */
declare class ProjectsResource extends BaseResource {
    /**
     * Get project by slug
     * @method GET /organizations/{id}/projects/by-slug/{projectSlug}
     */
    getProjectBySlug: ({ id, projectSlug, }: {
        id: string;
        projectSlug: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        name: string;
        slug: string;
        description?: string;
        logoUrl?: string;
        defaultLocale: string;
        enabledLocales: Array<string>;
        aiIntensity: "off" | "low" | "high";
        aiEntityConfig: Record<string, unknown>;
        isActive: boolean;
        ownerId?: string;
        createdAt: string;
        updatedAt: string;
        apps?: Array<{
            id: unknown;
            appType: unknown;
            name: unknown;
            slug: unknown;
        }>;
    }>;
    /**
     * Search project knowledge
     * @method GET /organizations/{id}/projects/{projectId}/search
     */
    searchProject: ({ id, projectId, query, limit, sourceTypes, }: {
        id: string;
        projectId: string;
        query: string;
        limit?: string;
        sourceTypes?: string;
    }) => Promise<Array<{
        sourceType: string;
        sourceId: string;
        content: string;
        similarity: number;
        metadata?: unknown;
    }>>;
    /**
     * Get all project URLs
     * @method GET /organizations/{id}/projects/{projectId}/urls
     */
    getProjectUrls: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<{
        urls: Array<{
            id: unknown;
            name: unknown;
            path: unknown;
            type: unknown;
            app: unknown;
            seo?: unknown;
        }>;
    }>;
    /**
     * Get a project by ID
     * @method GET /organizations/{id}/projects/{projectId}
     */
    getProject: ({ id, projectId, }: {
        id: string;
        projectId: string;
    }) => Promise<{
        id: string;
        organizationId: string;
        name: string;
        slug: string;
        description?: string;
        logoUrl?: string;
        defaultLocale: string;
        enabledLocales: Array<string>;
        aiIntensity: "off" | "low" | "high";
        aiEntityConfig: Record<string, unknown>;
        isActive: boolean;
        ownerId?: string;
        createdAt: string;
        updatedAt: string;
        apps?: Array<{
            id: unknown;
            appType: unknown;
            name: unknown;
            slug: unknown;
        }>;
    }>;
    /**
     * Get projects in an organization
     * @method GET /organizations/{id}/projects
     */
    getProjects: ({ id, page, pageSize, search, }: {
        id: string;
        page?: string;
        pageSize?: string;
        search?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            organizationId: unknown;
            name: unknown;
            slug: unknown;
            description?: unknown;
            logoUrl?: unknown;
            defaultLocale: unknown;
            enabledLocales: unknown;
            aiIntensity: unknown;
            aiEntityConfig: unknown;
            isActive: unknown;
            ownerId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
            apps?: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
}
/**
 * Website API methods
 */
declare class WebsiteResource extends BaseResource {
    /**
     * Get consent settings
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/consent
     */
    getWebsiteConsentSettings: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        id: string;
        appId: string;
        bannerEnabled: boolean;
        bannerTitle?: string | unknown;
        bannerDescription?: string | unknown;
        privacyPolicyUrl?: string | unknown;
        cookiePolicyUrl?: string | unknown;
        statisticsCookiesEnabled: boolean;
        marketingCookiesEnabled: boolean;
        autoDetectRegion: boolean;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get dialog
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}
     */
    getWebsiteDialog: ({ organizationId, projectId, appId, dialogId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        dialogId: string;
    }) => Promise<{
        id: string;
        appId: string;
        name: string;
        content?: Array<unknown>;
        maxWidth: unknown;
        includeClose: boolean;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get dialogs
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs
     */
    listWebsiteDialogs: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            appId: unknown;
            name: unknown;
            content?: unknown;
            maxWidth: unknown;
            includeClose: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get custom domain
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains/{domainId}
     */
    getWebsiteCustomDomain: ({ organizationId, projectId, appId, domainId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        domainId: string;
    }) => Promise<{
        id: string;
        appId: string;
        domain: string;
        isGenerated: boolean;
        isVerified: boolean;
        isPrimary: boolean;
        verificationToken?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get custom domains
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains
     */
    listWebsiteCustomDomains: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<Array<{
        id: string;
        appId: string;
        domain: string;
        isGenerated: boolean;
        isVerified: boolean;
        isPrimary: boolean;
        verificationToken?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>>;
    /**
     * Get website footer
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}
     */
    getWebsiteFooter: ({ organizationId, projectId, appId, footerId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        footerId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get website footers
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers
     */
    listWebsiteFooters: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get website header
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}
     */
    getWebsiteHeader: ({ organizationId, projectId, appId, headerId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        headerId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get website headers
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers
     */
    listWebsiteHeaders: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get website layout
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}
     */
    getWebsiteLayout: ({ organizationId, projectId, appId, layoutId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        layoutId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get website layouts
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts
     */
    listWebsiteLayouts: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get website page
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
     */
    getWebsitePage: ({ organizationId, projectId, appId, pageId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        pageId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        type: "page" | "post";
        name: string;
        slug: string;
        path?: string;
        url?: string;
        content?: unknown;
        status: "draft" | "published" | "scheduled";
        seo?: {
            title?: string | Record<string, unknown> | unknown;
            description?: string | Record<string, unknown> | unknown;
            image?: string | unknown;
        };
        isPublic?: boolean;
        isHomepage?: boolean;
        isNotFound?: boolean;
        excerpt?: string | unknown;
        authorId?: string | unknown;
        authorName?: string | unknown;
        authorAvatar?: string | unknown;
        featuredImageMediaId?: string | unknown;
        featuredImageUrl?: string | unknown;
        publishDate?: string | unknown;
        tags?: unknown;
        layoutId?: string | unknown;
        headerId?: string | unknown;
        footerId?: string | unknown;
        backgroundColor?: string | unknown;
        draftId?: string | unknown;
        layoutName?: string | unknown;
        headerName?: string | unknown;
        footerName?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get website pages
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages
     */
    getWebsitePages: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            type: unknown;
            name: unknown;
            slug: unknown;
            path?: unknown;
            url?: unknown;
            content?: unknown;
            status: unknown;
            seo?: unknown;
            isPublic?: unknown;
            isHomepage?: unknown;
            isNotFound?: unknown;
            excerpt?: unknown;
            authorId?: unknown;
            authorName?: unknown;
            authorAvatar?: unknown;
            featuredImageMediaId?: unknown;
            featuredImageUrl?: unknown;
            publishDate?: unknown;
            tags?: unknown;
            layoutId?: unknown;
            headerId?: unknown;
            footerId?: unknown;
            backgroundColor?: unknown;
            draftId?: unknown;
            layoutName?: unknown;
            headerName?: unknown;
            footerName?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get blog post
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
     */
    getWebsitePost: ({ organizationId, projectId, appId, postId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        postId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        type: "page" | "post";
        name: string;
        slug: string;
        path?: string;
        url?: string;
        content?: unknown;
        status: "draft" | "published" | "scheduled";
        seo?: {
            title?: string | Record<string, unknown> | unknown;
            description?: string | Record<string, unknown> | unknown;
            image?: string | unknown;
        };
        isPublic?: boolean;
        isHomepage?: boolean;
        isNotFound?: boolean;
        excerpt?: string | unknown;
        authorId?: string | unknown;
        authorName?: string | unknown;
        authorAvatar?: string | unknown;
        featuredImageMediaId?: string | unknown;
        featuredImageUrl?: string | unknown;
        publishDate?: string | unknown;
        tags?: unknown;
        layoutId?: string | unknown;
        headerId?: string | unknown;
        footerId?: string | unknown;
        backgroundColor?: string | unknown;
        draftId?: string | unknown;
        layoutName?: string | unknown;
        headerName?: string | unknown;
        footerName?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get blog posts
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts
     */
    getWebsitePosts: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            type: unknown;
            name: unknown;
            slug: unknown;
            path?: unknown;
            url?: unknown;
            content?: unknown;
            status: unknown;
            seo?: unknown;
            isPublic?: unknown;
            isHomepage?: unknown;
            isNotFound?: unknown;
            excerpt?: unknown;
            authorId?: unknown;
            authorName?: unknown;
            authorAvatar?: unknown;
            featuredImageMediaId?: unknown;
            featuredImageUrl?: unknown;
            publishDate?: unknown;
            tags?: unknown;
            layoutId?: unknown;
            headerId?: unknown;
            footerId?: unknown;
            backgroundColor?: unknown;
            draftId?: unknown;
            layoutName?: unknown;
            headerName?: unknown;
            footerName?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get website settings
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/settings
     */
    getWebsiteAppSettings: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        appId: string;
        defaultLocale: string;
        enabledLocales: Array<string>;
        blogRootPath?: string;
    }>;
    /**
     * Get website sidebar
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}
     */
    getWebsiteSidebar: ({ organizationId, projectId, appId, sidebarId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        sidebarId: string;
    }) => Promise<{
        id: string;
        projectId: string;
        name: string;
        content?: Array<unknown>;
        draftId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get website sidebars
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars
     */
    listWebsiteSidebars: ({ organizationId, projectId, appId, page, pageSize, search, lite, }: {
        organizationId: string;
        projectId: string;
        appId: string;
        page?: string;
        pageSize?: string;
        search?: string;
        lite?: string;
    }) => Promise<{
        data: Array<{
            id: unknown;
            projectId: unknown;
            name: unknown;
            content?: unknown;
            draftId?: unknown;
            createdAt: unknown;
            updatedAt: unknown;
        }>;
        meta: {
            total: number;
            page: number;
            pageSize: number;
            pageCount: number;
        };
    }>;
    /**
     * Get website tags
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags
     */
    getWebsiteTags: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<Array<string>>;
    /**
     * Get tracking settings
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tracking
     */
    getWebsiteTrackingSettings: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        id: string;
        appId: string;
        googleTagManagerId?: string | unknown;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get existing website page URLs
     * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/urls
     */
    getWebsiteUrls: ({ organizationId, projectId, appId, }: {
        organizationId: string;
        projectId: string;
        appId: string;
    }) => Promise<{
        slugs: Array<string>;
    }>;
}
declare class GiantContextClient {
    private baseUrl;
    private timeout;
    private apiKey;
    private jwtToken;
    private tokenExpiresAt;
    constructor(config: GiantContextConfig);
    private fetchWithTimeout;
    private getToken;
    request<T>(url: string, options: RequestOptions): Promise<T>;
}
/**
 * GiantContext SDK
 *
 * @example
 * ```typescript
 * const gc = createGiantContext({ apiKey: "gct_..." });
 *
 * // List organizations
 * const orgs = await gc.organizations.getOrganizations();
 *
 * // Get a project
 * const project = await gc.projects.getProject({ id: "org-id", projectId: "project-id" });
 * ```
 */
declare class GiantContext {
    private client;
    apiKeys: APIKeysResource;
    appMembers: AppMembersResource;
    bugReports: BugReportsResource;
    crm: CRMResource;
    chat: ChatResource;
    developers: DevelopersResource;
    drafts: DraftsResource;
    email: EmailResource;
    featureRequests: FeatureRequestsResource;
    forms: FormsResource;
    health: HealthResource;
    ideas: IdeasResource;
    invitations: InvitationsResource;
    kb: KBResource;
    me: MeResource;
    notifications: NotificationsResource;
    organizationMembers: OrganizationMembersResource;
    organizations: OrganizationsResource;
    projectApps: ProjectAppsResource;
    projectBranding: ProjectBrandingResource;
    projectDomains: ProjectDomainsResource;
    projectFiles: ProjectFilesResource;
    projectLegalDocuments: ProjectLegalDocumentsResource;
    projectMembers: ProjectMembersResource;
    projectTrash: ProjectTrashResource;
    projectWorkflows: ProjectWorkflowsResource;
    projects: ProjectsResource;
    website: WebsiteResource;
    constructor(config: GiantContextConfig);
}
/**
 * Create a GiantContext SDK instance
 */
declare const createGiantContext: (config: GiantContextConfig) => GiantContext;

export { GiantContext, type GiantContextConfig, GiantContextError, createGiantContext, createGiantContext as default };
