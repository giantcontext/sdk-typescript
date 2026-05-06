/** @format */

// AUTO-GENERATED - DO NOT EDIT
// Run "pnpm generate:sdk" to regenerate from OpenAPI spec

// ============================================================================
// Types
// ============================================================================

export type GiantContextConfig = {
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

export class GiantContextError extends Error {
	status: number;
	body: string;

	constructor(status: number, body: string) {
		super(`HTTP ${status}: ${body}`);
		this.name = "GiantContextError";
		this.status = status;
		this.body = body;
	}
}

// ============================================================================
// Base Resource Class
// ============================================================================

class BaseResource {
	constructor(protected client: GiantContextClient) {}

	protected async request<T>(
		url: string,
		options: RequestOptions,
	): Promise<T> {
		return this.client.request<T>(url, options);
	}

	protected cleanParams(
		params: Record<string, unknown>,
	): Record<string, unknown> {
		return Object.fromEntries(
			Object.entries(params).filter(([_, v]) => v !== undefined),
		);
	}
}

// ============================================================================
// Resource Classes
// ============================================================================

/**
 * API Keys API methods
 */
class APIKeysResource extends BaseResource {
	/**
	 * Get my API keys
	 * @method GET /me/api-keys
	 */
	listMyApiKeys = async (): Promise<{
		data: Array<{
			id: unknown;
			name: unknown;
			keyPrefix: unknown;
			organizationId: unknown;
			createdAt: unknown;
			lastUsedAt: unknown;
			expiresAt: unknown;
		}>;
	}> => {
		const endpoint = `/me/api-keys`;
		return this.request<{
			data: Array<{
				id: unknown;
				name: unknown;
				keyPrefix: unknown;
				organizationId: unknown;
				createdAt: unknown;
				lastUsedAt: unknown;
				expiresAt: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get organization API keys
	 * @method GET /organizations/{id}/api-keys
	 */
	listOrganizationApiKeys = async ({
		id,
	}: {
		id: string;
	}): Promise<{
		data: Array<Record<string, unknown>>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/api-keys`;
		return this.request<{
			data: Array<Record<string, unknown>>;
		}>(endpoint, { method: "GET" });
	};
}

/**
 * App Members API methods
 */
class AppMembersResource extends BaseResource {
	/**
	 * Get an app member by ID
	 * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members/{memberId}
	 */
	getAppMember = async ({
		id,
		projectId,
		appId,
		memberId,
	}: {
		id: string;
		projectId: string;
		appId: string;
		memberId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members/${encodeURIComponent(String(memberId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get members of an app
	 * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}/members
	 */
	getAppMembers = async ({
		id,
		projectId,
		appId,
	}: {
		id: string;
		projectId: string;
		appId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Bug Reports API methods
 */
class BugReportsResource extends BaseResource {
	/**
	 * Get my bug reports
	 * @method GET /me/bug-reports
	 */
	listMyBugReports = async (): Promise<{
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
	}> => {
		const endpoint = `/me/bug-reports`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get comments for a bug report
	 * @method GET /me/bug-reports/{id}/comments
	 */
	getBugReportComments = async ({
		id,
	}: {
		id: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			comment: unknown;
			author: unknown;
			createdAt: unknown;
			source: unknown;
		}>;
	}> => {
		const endpoint = `/me/bug-reports/${encodeURIComponent(String(id))}/comments`;
		return this.request<{
			data: Array<{
				id: unknown;
				comment: unknown;
				author: unknown;
				createdAt: unknown;
				source: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};
}

/**
 * CRM API methods
 */
class CRMResource extends BaseResource {
	/**
	 * Get activity
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities/{activityId}
	 */
	getCrmActivity = async ({
		organizationId,
		projectId,
		appId,
		activityId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		activityId: string;
	}): Promise<{
		id: string;
		appId: string;
		contactId?: string | unknown;
		companyId?: string | unknown;
		source?: string | unknown;
		description: string;
		data: Record<string, unknown>;
		createdAt: string;
		contact:
			| {
					id: string;
					firstName: string;
					lastName: string;
			  }
			| unknown;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities/${encodeURIComponent(String(activityId))}`;
		return this.request<{
			id: string;
			appId: string;
			contactId?: string | unknown;
			companyId?: string | unknown;
			source?: string | unknown;
			description: string;
			data: Record<string, unknown>;
			createdAt: string;
			contact:
				| {
						id: string;
						firstName: string;
						lastName: string;
				  }
				| unknown;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "GET" });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Log activity
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities
	 */
	logCrmActivity = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
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
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get activities for a company
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities
	 */
	getCrmCompanyActivities = async ({
		organizationId,
		projectId,
		appId,
		companyId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		companyId: string;
	}): Promise<
		Array<{
			id: string;
			appId: string;
			contactId?: string | unknown;
			companyId?: string | unknown;
			source?: string | unknown;
			description: string;
			data: Record<string, unknown>;
			createdAt: string;
			contact:
				| {
						id: unknown;
						firstName: unknown;
						lastName: unknown;
				  }
				| unknown;
			company:
				| {
						id: unknown;
						name: unknown;
				  }
				| unknown;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/activities`;
		return this.request<
			Array<{
				id: string;
				appId: string;
				contactId?: string | unknown;
				companyId?: string | unknown;
				source?: string | unknown;
				description: string;
				data: Record<string, unknown>;
				createdAt: string;
				contact:
					| {
							id: unknown;
							firstName: unknown;
							lastName: unknown;
					  }
					| unknown;
				company:
					| {
							id: unknown;
							name: unknown;
					  }
					| unknown;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get contacts for a company
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts
	 */
	getCrmCompanyContacts = async ({
		organizationId,
		projectId,
		appId,
		companyId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		companyId: string;
	}): Promise<
		Array<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<unknown>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: unknown;
						name: unknown;
				  }
				| unknown;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/contacts`;
		return this.request<
			Array<{
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
				source?:
					| "referral"
					| "website"
					| "cold_call"
					| "event"
					| "other"
					| unknown;
				properties: Record<string, unknown>;
				tags: Array<unknown>;
				emailSubscribed: boolean;
				locale?: string | unknown;
				lastActivityAt?: string | unknown;
				createdAt: string;
				updatedAt: string;
				company:
					| {
							id: unknown;
							name: unknown;
					  }
					| unknown;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get company
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}
	 */
	getCrmCompany = async ({
		organizationId,
		projectId,
		appId,
		companyId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		companyId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get activities for a contact
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities
	 */
	getCrmContactActivities = async ({
		organizationId,
		projectId,
		appId,
		contactId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
	}): Promise<
		Array<{
			id: string;
			appId: string;
			contactId?: string | unknown;
			companyId?: string | unknown;
			source?: string | unknown;
			description: string;
			data: Record<string, unknown>;
			createdAt: string;
			contact:
				| {
						id: unknown;
						firstName: unknown;
						lastName: unknown;
				  }
				| unknown;
			company:
				| {
						id: unknown;
						name: unknown;
				  }
				| unknown;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/activities`;
		return this.request<
			Array<{
				id: string;
				appId: string;
				contactId?: string | unknown;
				companyId?: string | unknown;
				source?: string | unknown;
				description: string;
				data: Record<string, unknown>;
				createdAt: string;
				contact:
					| {
							id: unknown;
							firstName: unknown;
							lastName: unknown;
					  }
					| unknown;
				company:
					| {
							id: unknown;
							name: unknown;
					  }
					| unknown;
			}>
		>(endpoint, { method: "GET" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
		data: {
			key: string;
			value: unknown;
		};
	}): Promise<{
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
		source?:
			| "referral"
			| "website"
			| "cold_call"
			| "event"
			| "other"
			| unknown;
		properties: Record<string, unknown>;
		tags: Array<string>;
		emailSubscribed: boolean;
		locale?: string | unknown;
		lastActivityAt?: string | unknown;
		createdAt: string;
		updatedAt: string;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/fields`;
		return this.request<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<string>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "PUT", data });
	};

	/**
	 * Get contact
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
	 */
	getCrmContact = async ({
		organizationId,
		projectId,
		appId,
		contactId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
	}): Promise<{
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
		source?:
			| "referral"
			| "website"
			| "cold_call"
			| "event"
			| "other"
			| unknown;
		properties: Record<string, unknown>;
		tags: Array<string>;
		emailSubscribed: boolean;
		locale?: string | unknown;
		lastActivityAt?: string | unknown;
		createdAt: string;
		updatedAt: string;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}`;
		return this.request<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<string>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "GET" });
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
		data,
	}: {
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
	}): Promise<{
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
		source?:
			| "referral"
			| "website"
			| "cold_call"
			| "event"
			| "other"
			| unknown;
		properties: Record<string, unknown>;
		tags: Array<string>;
		emailSubscribed: boolean;
		locale?: string | unknown;
		lastActivityAt?: string | unknown;
		createdAt: string;
		updatedAt: string;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}`;
		return this.request<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<string>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "PUT", data });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
		data: {
			tag: string;
		};
	}): Promise<{
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
		source?:
			| "referral"
			| "website"
			| "cold_call"
			| "event"
			| "other"
			| unknown;
		properties: Record<string, unknown>;
		tags: Array<string>;
		emailSubscribed: boolean;
		locale?: string | unknown;
		lastActivityAt?: string | unknown;
		createdAt: string;
		updatedAt: string;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/tags`;
		return this.request<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<string>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "POST", data });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
		data: {
			tag: string;
		};
	}): Promise<{
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
		source?:
			| "referral"
			| "website"
			| "cold_call"
			| "event"
			| "other"
			| unknown;
		properties: Record<string, unknown>;
		tags: Array<string>;
		emailSubscribed: boolean;
		locale?: string | unknown;
		lastActivityAt?: string | unknown;
		createdAt: string;
		updatedAt: string;
		company:
			| {
					id: string;
					name: string;
			  }
			| unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/tags`;
		return this.request<{
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
			source?:
				| "referral"
				| "website"
				| "cold_call"
				| "event"
				| "other"
				| unknown;
			properties: Record<string, unknown>;
			tags: Array<string>;
			emailSubscribed: boolean;
			locale?: string | unknown;
			lastActivityAt?: string | unknown;
			createdAt: string;
			updatedAt: string;
			company:
				| {
						id: string;
						name: string;
				  }
				| unknown;
		}>(endpoint, { method: "DELETE", data });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Create contact
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts
	 */
	createCrmContact = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
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
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Chat API methods
 */
class ChatResource extends BaseResource {
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
		limit,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		conversationId: string;
		cursor?: string;
		cursorId?: string;
		direction?: string;
		limit?: string;
	}): Promise<{
		id: string;
		projectId?: string | unknown;
		userId?: string | unknown;
		visitorId?: string | unknown;
		title?: string | unknown;
		positiveFeedbackCount?: number;
		negativeFeedbackCount?: number;
		escalationCount?: number;
		latestEscalationStatus?:
			| "collecting_contact"
			| "collecting_summary"
			| "submitted"
			| "cancelled"
			| unknown;
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/chat/${encodeURIComponent(String(appId))}/conversations/${encodeURIComponent(String(conversationId))}`;
		const params = this.cleanParams({ cursor, cursorId, direction, limit });
		return this.request<{
			id: string;
			projectId?: string | unknown;
			userId?: string | unknown;
			visitorId?: string | unknown;
			title?: string | unknown;
			positiveFeedbackCount?: number;
			negativeFeedbackCount?: number;
			escalationCount?: number;
			latestEscalationStatus?:
				| "collecting_contact"
				| "collecting_summary"
				| "submitted"
				| "cancelled"
				| unknown;
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
		}>(endpoint, { method: "GET", params });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/chat/${encodeURIComponent(String(appId))}/conversations`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Developers API methods
 */
class DevelopersResource extends BaseResource {
	/**
	 * Get developer doc category
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
	 */
	getDevelopersDocCategory = async ({
		organizationId,
		projectId,
		appId,
		categoryId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
	}): Promise<Record<string, unknown>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<Record<string, unknown>>(endpoint, { method: "GET" });
	};

	/**
	 * Get developer doc categories
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
	 */
	listDevelopersDocCategories = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<Array<Record<string, unknown>>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
		return this.request<Array<Record<string, unknown>>>(endpoint, {
			method: "GET",
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
		docId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		docId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs/${encodeURIComponent(String(docId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		categoryId?: string;
		status?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs`;
		const params = this.cleanParams({
			page,
			pageSize,
			categoryId,
			status,
			search,
			lite,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * List developer sync logs
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs
	 */
	listDevelopersSyncLogs = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/sync-logs`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Drafts API methods
 */
class DraftsResource extends BaseResource {
	/**
	 * Generate AI content draft
	 * @method POST /drafts/generate
	 */
	generateDraft = async ({
		data,
	}: {
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
	}): Promise<{
		draftId: string;
		status: unknown;
	}> => {
		const endpoint = `/drafts/generate`;
		return this.request<{
			draftId: string;
			status: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Create an edit draft
	 * @method POST /drafts/edit
	 */
	editDraft = async ({
		data,
	}: {
		data: {
			organizationId: string;
			projectId: string;
			contentType: string;
			resourceId: string;
			prompt?: string;
		};
	}): Promise<{
		draftId: string;
		status: unknown;
	}> => {
		const endpoint = `/drafts/edit`;
		return this.request<{
			draftId: string;
			status: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Unarchive a draft
	 * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/unarchive
	 */
	unarchiveDraft = async ({
		id,
		projectId,
		draftId,
	}: {
		id: string;
		projectId: string;
		draftId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/unarchive`;
		return this.request<{
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
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Archive a draft
	 * @method POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/archive
	 */
	archiveDraft = async ({
		id,
		projectId,
		draftId,
	}: {
		id: string;
		projectId: string;
		draftId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/archive`;
		return this.request<{
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
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Get a draft by ID
	 * @method GET /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
	 */
	getDraft = async ({
		id,
		projectId,
		draftId,
	}: {
		id: string;
		projectId: string;
		draftId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete a draft
	 * @method DELETE /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}
	 */
	deleteDraft = async ({
		id,
		projectId,
		draftId,
	}: {
		id: string;
		projectId: string;
		draftId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		includeArchived,
	}: {
		id: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		includeArchived?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			includeArchived,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Email API methods
 */
class EmailResource extends BaseResource {
	/**
	 * Send transactional email
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/actions/send
	 */
	sendTransactionalEmail = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
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
	}): Promise<{
		success: boolean;
		messageId?: string;
		error?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/actions/send`;
		return this.request<{
			success: boolean;
			messageId?: string;
			error?: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Contact email timeline
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/contacts/{contactId}/timeline
	 */
	getContactEmailTimeline = async ({
		organizationId,
		projectId,
		appId,
		contactId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
	}): Promise<{
		contactId: string;
		draftId: string | unknown;
		entries: Array<{
			send: unknown;
			emailName: unknown;
			emailSlug: unknown;
			stats: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/timeline`;
		return this.request<{
			contactId: string;
			draftId: string | unknown;
			entries: Array<{
				send: unknown;
				emailName: unknown;
				emailSlug: unknown;
				stats: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get email template
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
	 */
	getEmail = async ({
		organizationId,
		projectId,
		appId,
		emailId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		recipientId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		recipientId: string;
	}): Promise<{
		id: string;
		emailId: string;
		contactId: string;
		subscribedAt: string;
		unsubscribedAt?: string | unknown;
		unsubscribeReason?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients/${encodeURIComponent(String(recipientId))}`;
		return this.request<{
			id: string;
			emailId: string;
			contactId: string;
			subscribedAt: string;
			unsubscribedAt?: string | unknown;
			unsubscribeReason?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		recipientId: string;
		data: {
			reason?: string;
		};
	}): Promise<{
		id: string;
		emailId: string;
		contactId: string;
		subscribedAt: string;
		unsubscribedAt?: string | unknown;
		unsubscribeReason?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients/${encodeURIComponent(String(recipientId))}/unsubscribe`;
		return this.request<{
			id: string;
			emailId: string;
			contactId: string;
			subscribedAt: string;
			unsubscribedAt?: string | unknown;
			unsubscribeReason?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST", data });
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
		pageSize,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		page?: string;
		pageSize?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients`;
		const params = this.cleanParams({ page, pageSize });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		data: {
			contactId: string;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}/recipients`;
		return this.request<unknown>(endpoint, { method: "POST", data });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get email footer
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}
	 */
	getEmailFooter = async ({
		organizationId,
		projectId,
		appId,
		footerId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		footerId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get email header
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}
	 */
	getEmailHeader = async ({
		organizationId,
		projectId,
		appId,
		headerId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		headerId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get email send with events
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}
	 */
	getEmailSend = async ({
		organizationId,
		projectId,
		appId,
		sendId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		sendId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends/${encodeURIComponent(String(sendId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		sendId: string;
		data: {
			status?: "planned" | "queued" | "sent" | "failed" | "cancelled";
			scheduledFor?: string | unknown;
			metadata?: Record<string, unknown>;
		};
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends/${encodeURIComponent(String(sendId))}`;
		return this.request<{
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
		}>(endpoint, { method: "PATCH", data });
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
		status,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		emailId?: string;
		contactId?: string;
		status?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends`;
		const params = this.cleanParams({
			page,
			pageSize,
			emailId,
			contactId,
			status,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Create a planned send
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends
	 */
	createEmailSend = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
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
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/sends`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Feature Requests API methods
 */
class FeatureRequestsResource extends BaseResource {
	/**
	 * Get popular feature requests
	 * @method GET /me/feature-requests/popular
	 */
	getPopularFeatureRequests = async ({
		limit,
		offset,
		status,
	}: {
		limit?: string;
		offset?: string;
		status?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/me/feature-requests/popular`;
		const params = this.cleanParams({ limit, offset, status });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get my feature requests
	 * @method GET /me/feature-requests
	 */
	listMyFeatureRequests = async (): Promise<{
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
	}> => {
		const endpoint = `/me/feature-requests`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get comments for a feature request
	 * @method GET /me/feature-requests/{id}/comments
	 */
	getFeatureRequestComments = async ({
		id,
	}: {
		id: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			comment: unknown;
			author: unknown;
			createdAt: unknown;
			source: unknown;
		}>;
	}> => {
		const endpoint = `/me/feature-requests/${encodeURIComponent(String(id))}/comments`;
		return this.request<{
			data: Array<{
				id: unknown;
				comment: unknown;
				author: unknown;
				createdAt: unknown;
				source: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Forms API methods
 */
class FormsResource extends BaseResource {
	/**
	 * Get form
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
	 */
	getForm = async ({
		organizationId,
		projectId,
		appId,
		formId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		formId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		submissionId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		formId: string;
		submissionId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}/submissions/${encodeURIComponent(String(submissionId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		formId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}/submissions`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
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
		search,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Health API methods
 */
class HealthResource extends BaseResource {
	/**
	 * Verify LLM connectivity
	 * @method GET /health/echo
	 */
	getHealthEcho = async (): Promise<{
		status: string;
		message?: string;
		error?: string;
	}> => {
		const endpoint = `/health/echo`;
		return this.request<{
			status: string;
			message?: string;
			error?: string;
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Ideas API methods
 */
class IdeasResource extends BaseResource {
	/**
	 * Approve a Mind idea
	 * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/approve
	 */
	approveIdea = async ({
		id,
		projectId,
		ideaId,
		data,
	}: {
		id: string;
		projectId: string;
		ideaId: string;
		data: {
			contentType?: string;
			prompt?: string;
		};
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/approve`;
		return this.request<{
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
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Dismiss a Mind idea
	 * @method POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/dismiss
	 */
	dismissIdea = async ({
		id,
		projectId,
		ideaId,
		data,
	}: {
		id: string;
		projectId: string;
		ideaId: string;
		data: {
			reason?: string;
		};
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/dismiss`;
		return this.request<{
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
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get a Mind idea
	 * @method GET /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}
	 */
	getIdea = async ({
		id,
		projectId,
		ideaId,
	}: {
		id: string;
		projectId: string;
		ideaId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		id: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
		const params = this.cleanParams({ page, pageSize, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Trigger Mind ideation for a project
	 * @method POST /organizations/{id}/projects/{projectId}/mind/ideas
	 */
	triggerIdeation = async ({
		id,
		projectId,
		data,
	}: {
		id: string;
		projectId: string;
		data: {
			target?: {
				contentType: string;
				operationKey: string;
			};
		};
	}): Promise<{
		ideas: Array<unknown>;
		count: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
		return this.request<{
			ideas: Array<unknown>;
			count: number;
		}>(endpoint, { method: "POST", data });
	};
}

/**
 * Invitations API methods
 */
class InvitationsResource extends BaseResource {
	/**
	 * Get an invitation by ID
	 * @method GET /organizations/{id}/invitations/{invitationId}
	 */
	getOrganizationInvitation = async ({
		id,
		invitationId,
	}: {
		id: string;
		invitationId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/invitations/${encodeURIComponent(String(invitationId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get organization invitations
	 * @method GET /organizations/{id}/invitations
	 */
	getOrganizationInvitations = async ({
		id,
	}: {
		id: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/invitations`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * KB API methods
 */
class KBResource extends BaseResource {
	/**
	 * Get KB article
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
	 */
	getKbArticle = async ({
		organizationId,
		projectId,
		appId,
		articleId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		articleId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles/${encodeURIComponent(String(articleId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		categoryId?: string;
		status?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles`;
		const params = this.cleanParams({
			page,
			pageSize,
			categoryId,
			status,
			search,
			lite,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get KB category
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
	 */
	getKbCategory = async ({
		organizationId,
		projectId,
		appId,
		categoryId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
	}): Promise<Record<string, unknown>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<Record<string, unknown>>(endpoint, { method: "GET" });
	};

	/**
	 * Get KB categories
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
	 */
	listKbCategories = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<Array<Record<string, unknown>>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
		return this.request<Array<Record<string, unknown>>>(endpoint, {
			method: "GET",
		});
	};

	/**
	 * Get KB settings
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/settings
	 */
	getKbSettings = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
		rootUrl?: string;
		brandingId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/settings`;
		return this.request<{
			rootUrl?: string;
			brandingId?: string | unknown;
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Me API methods
 */
class MeResource extends BaseResource {
	/**
	 * Get my suspension appeal messages
	 * @method GET /me/suspension-messages
	 */
	getMySuspensionMessages = async (): Promise<
		Array<{
			id: string;
			userId: string;
			authorType: "user" | "admin";
			authorId?: string;
			authorName?: string;
			message: string;
			createdAt: string;
		}>
	> => {
		const endpoint = `/me/suspension-messages`;
		return this.request<
			Array<{
				id: string;
				userId: string;
				authorType: "user" | "admin";
				authorId?: string;
				authorName?: string;
				message: string;
				createdAt: string;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get my notifications
	 * @method GET /me/notifications
	 */
	getMyNotifications = async ({
		page,
		pageSize,
		search,
		status,
	}: {
		page?: string;
		pageSize?: string;
		search?: string;
		status?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/me/notifications`;
		const params = this.cleanParams({ page, pageSize, search, status });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get organizations I belong to
	 * @method GET /me/organizations
	 */
	getMyOrganizations = async (): Promise<Array<Record<string, unknown>>> => {
		const endpoint = `/me/organizations`;
		return this.request<Array<Record<string, unknown>>>(endpoint, {
			method: "GET",
		});
	};

	/**
	 * Get my pending invitations
	 * @method GET /me/invitations
	 */
	getMyInvitations = async (): Promise<{
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
	}> => {
		const endpoint = `/me/invitations`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get my activity history
	 * @method GET /me/activities
	 */
	getMyActivities = async ({
		page,
		pageSize,
		lite,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/me/activities`;
		const params = this.cleanParams({ page, pageSize, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get current user profile and permissions
	 * @method GET /me
	 */
	getMe = async (): Promise<{
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
	}> => {
		const endpoint = `/me`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Notifications API methods
 */
class NotificationsResource extends BaseResource {
	/**
	 * Send a notification
	 * @method POST /notifications/send
	 */
	sendNotification = async ({
		data,
	}: {
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
	}): Promise<{
		delivered: number;
		skipped: number;
		failed: number;
	}> => {
		const endpoint = `/notifications/send`;
		return this.request<{
			delivered: number;
			skipped: number;
			failed: number;
		}>(endpoint, { method: "POST", data });
	};
}

/**
 * Organization Members API methods
 */
class OrganizationMembersResource extends BaseResource {
	/**
	 * Get member project memberships
	 * @method GET /organizations/{id}/members/{memberId}/project-memberships
	 */
	getMemberProjectMemberships = async ({
		id,
		memberId,
	}: {
		id: string;
		memberId: string;
	}): Promise<
		Array<{
			projectId: string;
			projectName: string;
			projectSlug: string;
			membershipId: string | unknown;
			role: "owner" | "admin" | "editor" | "viewer" | unknown;
			joinedAt: string | unknown;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}/project-memberships`;
		return this.request<
			Array<{
				projectId: string;
				projectName: string;
				projectSlug: string;
				membershipId: string | unknown;
				role: "owner" | "admin" | "editor" | "viewer" | unknown;
				joinedAt: string | unknown;
			}>
		>(endpoint, { method: "GET" });
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
		lite,
	}: {
		id: string;
		memberId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}/activities`;
		const params = this.cleanParams({ page, pageSize, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get a member by ID
	 * @method GET /organizations/{id}/members/{memberId}
	 */
	getOrganizationMember = async ({
		id,
		memberId,
	}: {
		id: string;
		memberId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/members/${encodeURIComponent(String(memberId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get organization members
	 * @method GET /organizations/{id}/members
	 */
	getOrganizationMembers = async ({
		id,
		page,
		pageSize,
		lite,
	}: {
		id: string;
		page?: string;
		pageSize?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/members`;
		const params = this.cleanParams({ page, pageSize, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Organizations API methods
 */
class OrganizationsResource extends BaseResource {
	/**
	 * Get a service account
	 * @method GET /organizations/{id}/service-accounts/{accountId}
	 */
	getServiceAccount = async ({
		id,
		accountId,
	}: {
		id: string;
		accountId: string;
	}): Promise<{
		id: string;
		name: string;
		email: string;
		description: string | unknown;
		organizationId: string;
		memberId: string;
		role: "admin" | "member" | "viewer";
		createdAt: string;
		createdBy: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/service-accounts/${encodeURIComponent(String(accountId))}`;
		return this.request<{
			id: string;
			name: string;
			email: string;
			description: string | unknown;
			organizationId: string;
			memberId: string;
			role: "admin" | "member" | "viewer";
			createdAt: string;
			createdBy: string | unknown;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get organization service accounts
	 * @method GET /organizations/{id}/service-accounts
	 */
	listServiceAccounts = async ({
		id,
	}: {
		id: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/service-accounts`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get organization by slug
	 * @method GET /organizations/by-slug/{slug}
	 */
	getOrganizationBySlug = async ({
		slug,
	}: {
		slug: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/by-slug/${encodeURIComponent(String(slug))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get an organization by ID
	 * @method GET /organizations/{id}
	 */
	getOrganization = async ({
		id,
	}: {
		id: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Project Apps API methods
 */
class ProjectAppsResource extends BaseResource {
	/**
	 * Get a project app by slug
	 * @method GET /organizations/{id}/projects/{projectId}/apps/by-slug/{appSlug}
	 */
	getProjectAppBySlug = async ({
		id,
		projectId,
		appSlug,
	}: {
		id: string;
		projectId: string;
		appSlug: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/by-slug/${encodeURIComponent(String(appSlug))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get a project app by ID
	 * @method GET /organizations/{id}/projects/{projectId}/apps/{appId}
	 */
	getProjectApp = async ({
		id,
		projectId,
		appId,
	}: {
		id: string;
		projectId: string;
		appId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get deleted apps in trash
	 * @method GET /organizations/{id}/projects/{projectId}/apps/trash
	 */
	getDeletedProjectApps = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<
		Array<{
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
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps/trash`;
		return this.request<
			Array<{
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
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get apps in a project
	 * @method GET /organizations/{id}/projects/{projectId}/apps
	 */
	getProjectApps = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/apps`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Project Branding API methods
 */
class ProjectBrandingResource extends BaseResource {
	/**
	 * Get project branding
	 * @method GET /organizations/{id}/projects/{projectId}/brandings/{brandingId}
	 */
	getProjectBranding = async ({
		id,
		projectId,
		brandingId,
	}: {
		id: string;
		projectId: string;
		brandingId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/brandings/${encodeURIComponent(String(brandingId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get project brandings
	 * @method GET /organizations/{id}/projects/{projectId}/brandings
	 */
	listProjectBrandings = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/brandings`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Project Domains API methods
 */
class ProjectDomainsResource extends BaseResource {
	/**
	 * Get domain verification instructions
	 * @method GET /organizations/{id}/projects/{projectId}/domains/{domainId}/verification
	 */
	getDomainVerificationInstructions = async ({
		id,
		projectId,
		domainId,
	}: {
		id: string;
		projectId: string;
		domainId: string;
	}): Promise<{
		hostname: string;
		verificationStatus: unknown;
		dnsRecordName: string | unknown;
		dnsRecordType: string | unknown;
		dnsRecordValue: string | unknown;
		verificationError: string | unknown;
		loadBalancerIp: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/domains/${encodeURIComponent(String(domainId))}/verification`;
		return this.request<{
			hostname: string;
			verificationStatus: unknown;
			dnsRecordName: string | unknown;
			dnsRecordType: string | unknown;
			dnsRecordValue: string | unknown;
			verificationError: string | unknown;
			loadBalancerIp: string | unknown;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get all domains for a project
	 * @method GET /organizations/{id}/projects/{projectId}/domains
	 */
	listProjectDomains = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<
		Array<{
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
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/domains`;
		return this.request<
			Array<{
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
			}>
		>(endpoint, { method: "GET" });
	};
}

/**
 * Project Files API methods
 */
class ProjectFilesResource extends BaseResource {
	/**
	 * Get all places where a file is referenced
	 * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/references
	 */
	getFileReferences = async ({
		id,
		projectId,
		fileId,
	}: {
		id: string;
		projectId: string;
		fileId: string;
	}): Promise<
		Array<{
			type: unknown;
			id: string;
			name: string;
			projectId: string;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/references`;
		return this.request<
			Array<{
				type: unknown;
				id: string;
				name: string;
				projectId: string;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get a file folder
	 * @method GET /organizations/{id}/projects/{projectId}/files/folders/{folderId}
	 */
	getFileFolder = async ({
		id,
		projectId,
		folderId,
	}: {
		id: string;
		projectId: string;
		folderId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Replace file content
	 * @method PUT /organizations/{id}/projects/{projectId}/files/{fileId}/content
	 */
	replaceFileContent = async ({
		id,
		projectId,
		fileId,
		data,
	}: {
		id: string;
		projectId: string;
		fileId: string;
		data: {
			content: string;
		};
	}): Promise<{
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
		compressionStatus?:
			| "pending"
			| "processing"
			| "complete"
			| "failed"
			| unknown;
		referenceCount?: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/content`;
		return this.request<{
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
			compressionStatus?:
				| "pending"
				| "processing"
				| "complete"
				| "failed"
				| unknown;
			referenceCount?: number;
		}>(endpoint, { method: "PUT", data });
	};

	/**
	 * Read file content
	 * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}/open
	 */
	openFile = async ({
		id,
		projectId,
		fileId,
	}: {
		id: string;
		projectId: string;
		fileId: string;
	}): Promise<{
		id: string;
		filename: string;
		mimeType: string;
		sizeBytes: number;
		content?: string;
		base64Content?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/open`;
		return this.request<{
			id: string;
			filename: string;
			mimeType: string;
			sizeBytes: number;
			content?: string;
			base64Content?: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get a file
	 * @method GET /organizations/{id}/projects/{projectId}/files/{fileId}
	 */
	getFile = async ({
		id,
		projectId,
		fileId,
	}: {
		id: string;
		projectId: string;
		fileId: string;
	}): Promise<{
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
		compressionStatus?:
			| "pending"
			| "processing"
			| "complete"
			| "failed"
			| unknown;
		referenceCount?: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
		return this.request<{
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
			compressionStatus?:
				| "pending"
				| "processing"
				| "complete"
				| "failed"
				| unknown;
			referenceCount?: number;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get file folders in a project
	 * @method GET /organizations/{id}/projects/{projectId}/files/folders
	 */
	getFileFolders = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<
		Array<{
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
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/folders`;
		return this.request<
			Array<{
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
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Search files by content
	 * @method GET /organizations/{id}/projects/{projectId}/files/search
	 */
	searchFiles = async ({
		id,
		projectId,
		query,
		limit,
	}: {
		id: string;
		projectId: string;
		query: string;
		limit?: string;
	}): Promise<
		Array<{
			fileId: string;
			filename: string;
			originalFilename: string;
			mimeType: string;
			url: string;
			similarity: number;
			matchingContent: string;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/search`;
		const params = this.cleanParams({ query, limit });
		return this.request<
			Array<{
				fileId: string;
				filename: string;
				originalFilename: string;
				mimeType: string;
				url: string;
				similarity: number;
				matchingContent: string;
			}>
		>(endpoint, { method: "GET", params });
	};

	/**
	 * Get items in trash
	 * @method GET /organizations/{id}/projects/{projectId}/files/trash
	 */
	listFileTrash = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<
		Array<{
			id: string;
			type: "file" | "folder";
			name: string;
			deletedAt: string;
			deletedBy: string | unknown;
			parentId: string | unknown;
			mimeType?: string;
			sizeBytes?: number;
			url?: string;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/trash`;
		return this.request<
			Array<{
				id: string;
				type: "file" | "folder";
				name: string;
				deletedAt: string;
				deletedBy: string | unknown;
				parentId: string | unknown;
				mimeType?: string;
				sizeBytes?: number;
				url?: string;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Save a file from text or image content
	 * @method POST /organizations/{id}/projects/{projectId}/files/save
	 */
	saveFile = async ({
		id,
		projectId,
		data,
	}: {
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
	}): Promise<{
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
		compressionStatus?:
			| "pending"
			| "processing"
			| "complete"
			| "failed"
			| unknown;
		referenceCount?: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files/save`;
		return this.request<{
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
			compressionStatus?:
				| "pending"
				| "processing"
				| "complete"
				| "failed"
				| unknown;
			referenceCount?: number;
		}>(endpoint, { method: "POST", data });
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
		mimeType,
	}: {
		id: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		folderId?: string;
		mimeType?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/files`;
		const params = this.cleanParams({
			page,
			pageSize,
			search,
			folderId,
			mimeType,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Project Legal Documents API methods
 */
class ProjectLegalDocumentsResource extends BaseResource {
	/**
	 * Get a project legal document by ID
	 * @method GET /organizations/{id}/projects/{projectId}/legal/{documentId}
	 */
	getProjectLegalDocument = async ({
		id,
		projectId,
		documentId,
	}: {
		id: string;
		projectId: string;
		documentId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * List project legal documents
	 * @method GET /organizations/{id}/projects/{projectId}/legal
	 */
	listProjectLegalDocuments = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/legal`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};
}

/**
 * Project Members API methods
 */
class ProjectMembersResource extends BaseResource {
	/**
	 * Get a project member by ID
	 * @method GET /organizations/{id}/projects/{projectId}/members/{memberId}
	 */
	getProjectMember = async ({
		id,
		projectId,
		memberId,
	}: {
		id: string;
		projectId: string;
		memberId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/members/${encodeURIComponent(String(memberId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get project members
	 * @method GET /organizations/{id}/projects/{projectId}/members
	 */
	getProjectMembers = async ({
		id,
		projectId,
		page,
		pageSize,
	}: {
		id: string;
		projectId: string;
		page?: string;
		pageSize?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/members`;
		const params = this.cleanParams({ page, pageSize });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Project Trash API methods
 */
class ProjectTrashResource extends BaseResource {
	/**
	 * Get a single trash item
	 * @method GET /organizations/{id}/projects/{projectId}/trash/{trashId}
	 */
	getProjectTrashItem = async ({
		id,
		projectId,
		trashId,
	}: {
		id: string;
		projectId: string;
		trashId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		search,
	}: {
		id: string;
		projectId: string;
		type?: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/trash`;
		const params = this.cleanParams({ type, page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Project Workflows API methods
 */
class ProjectWorkflowsResource extends BaseResource {
	/**
	 * Get a workflow run and its tasks
	 * @method GET /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
	 */
	getWorkflowRun = async ({
		id,
		projectId,
		runId,
	}: {
		id: string;
		projectId: string;
		runId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Dismiss a workflow run
	 * @method DELETE /organizations/{id}/projects/{projectId}/workflows/runs/{runId}
	 */
	dismissWorkflowRun = async ({
		id,
		projectId,
		runId,
	}: {
		id: string;
		projectId: string;
		runId: string;
	}): Promise<{
		success: boolean;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
		return this.request<{
			success: boolean;
		}>(endpoint, { method: "DELETE" });
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
		includeDismissed,
	}: {
		id: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		status?: string;
		type?: string;
		includeDismissed?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
		const params = this.cleanParams({
			page,
			pageSize,
			status,
			type,
			includeDismissed,
		});
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Start a workflow run
	 * @method POST /organizations/{id}/projects/{projectId}/workflows/runs
	 */
	createWorkflowRun = async ({
		id,
		projectId,
		data,
	}: {
		id: string;
		projectId: string;
		data: {
			type: string;
			title?: string;
			input?: Record<string, unknown>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Projects API methods
 */
class ProjectsResource extends BaseResource {
	/**
	 * Get project by slug
	 * @method GET /organizations/{id}/projects/by-slug/{projectSlug}
	 */
	getProjectBySlug = async ({
		id,
		projectSlug,
	}: {
		id: string;
		projectSlug: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/by-slug/${encodeURIComponent(String(projectSlug))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		sourceTypes,
	}: {
		id: string;
		projectId: string;
		query: string;
		limit?: string;
		sourceTypes?: string;
	}): Promise<
		Array<{
			sourceType: string;
			sourceId: string;
			content: string;
			similarity: number;
			metadata?: unknown;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/search`;
		const params = this.cleanParams({ query, limit, sourceTypes });
		return this.request<
			Array<{
				sourceType: string;
				sourceId: string;
				content: string;
				similarity: number;
				metadata?: unknown;
			}>
		>(endpoint, { method: "GET", params });
	};

	/**
	 * Get all project URLs
	 * @method GET /organizations/{id}/projects/{projectId}/urls
	 */
	getProjectUrls = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<{
		urls: Array<{
			id: unknown;
			name: unknown;
			path: unknown;
			type: unknown;
			app: unknown;
			seo?: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}/urls`;
		return this.request<{
			urls: Array<{
				id: unknown;
				name: unknown;
				path: unknown;
				type: unknown;
				app: unknown;
				seo?: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get a project by ID
	 * @method GET /organizations/{id}/projects/{projectId}
	 */
	getProject = async ({
		id,
		projectId,
	}: {
		id: string;
		projectId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects/${encodeURIComponent(String(projectId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get projects in an organization
	 * @method GET /organizations/{id}/projects
	 */
	getProjects = async ({
		id,
		page,
		pageSize,
		search,
	}: {
		id: string;
		page?: string;
		pageSize?: string;
		search?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(id))}/projects`;
		const params = this.cleanParams({ page, pageSize, search });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Website API methods
 */
class WebsiteResource extends BaseResource {
	/**
	 * Get consent settings
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/consent
	 */
	getWebsiteConsentSettings = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/consent`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get dialog
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}
	 */
	getWebsiteDialog = async ({
		organizationId,
		projectId,
		appId,
		dialogId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		dialogId: string;
	}): Promise<{
		id: string;
		appId: string;
		name: string;
		content?: Array<unknown>;
		maxWidth: unknown;
		includeClose: boolean;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs/${encodeURIComponent(String(dialogId))}`;
		return this.request<{
			id: string;
			appId: string;
			name: string;
			content?: Array<unknown>;
			maxWidth: unknown;
			includeClose: boolean;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get custom domain
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains/{domainId}
	 */
	getWebsiteCustomDomain = async ({
		organizationId,
		projectId,
		appId,
		domainId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		domainId: string;
	}): Promise<{
		id: string;
		appId: string;
		domain: string;
		isGenerated: boolean;
		isVerified: boolean;
		isPrimary: boolean;
		verificationToken?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/domains/${encodeURIComponent(String(domainId))}`;
		return this.request<{
			id: string;
			appId: string;
			domain: string;
			isGenerated: boolean;
			isVerified: boolean;
			isPrimary: boolean;
			verificationToken?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get custom domains
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains
	 */
	listWebsiteCustomDomains = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<
		Array<{
			id: string;
			appId: string;
			domain: string;
			isGenerated: boolean;
			isVerified: boolean;
			isPrimary: boolean;
			verificationToken?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>
	> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/domains`;
		return this.request<
			Array<{
				id: string;
				appId: string;
				domain: string;
				isGenerated: boolean;
				isVerified: boolean;
				isPrimary: boolean;
				verificationToken?: string | unknown;
				createdAt: string;
				updatedAt: string;
			}>
		>(endpoint, { method: "GET" });
	};

	/**
	 * Get website footer
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}
	 */
	getWebsiteFooter = async ({
		organizationId,
		projectId,
		appId,
		footerId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		footerId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get website header
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}
	 */
	getWebsiteHeader = async ({
		organizationId,
		projectId,
		appId,
		headerId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		headerId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get website layout
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}
	 */
	getWebsiteLayout = async ({
		organizationId,
		projectId,
		appId,
		layoutId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		layoutId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts/${encodeURIComponent(String(layoutId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get website page
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
	 */
	getWebsitePage = async ({
		organizationId,
		projectId,
		appId,
		pageId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		pageId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages/${encodeURIComponent(String(pageId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get blog post
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
	 */
	getWebsitePost = async ({
		organizationId,
		projectId,
		appId,
		postId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		postId: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts/${encodeURIComponent(String(postId))}`;
		return this.request<{
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
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get website settings
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/settings
	 */
	getWebsiteAppSettings = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
		appId: string;
		defaultLocale: string;
		enabledLocales: Array<string>;
		blogRootPath?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/settings`;
		return this.request<{
			appId: string;
			defaultLocale: string;
			enabledLocales: Array<string>;
			blogRootPath?: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get website sidebar
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}
	 */
	getWebsiteSidebar = async ({
		organizationId,
		projectId,
		appId,
		sidebarId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		sidebarId: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<unknown>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars/${encodeURIComponent(String(sidebarId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<unknown>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		lite,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		search?: string;
		lite?: string;
	}): Promise<{
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
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars`;
		const params = this.cleanParams({ page, pageSize, search, lite });
		return this.request<{
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get website tags
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags
	 */
	getWebsiteTags = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<Array<string>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tags`;
		return this.request<Array<string>>(endpoint, { method: "GET" });
	};

	/**
	 * Get tracking settings
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tracking
	 */
	getWebsiteTrackingSettings = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
		id: string;
		appId: string;
		googleTagManagerId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tracking`;
		return this.request<{
			id: string;
			appId: string;
			googleTagManagerId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get existing website page URLs
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/urls
	 */
	getWebsiteUrls = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
		slugs: Array<string>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/urls`;
		return this.request<{
			slugs: Array<string>;
		}>(endpoint, { method: "GET" });
	};
}

// ============================================================================
// Main Client
// ============================================================================

class GiantContextClient {
	private baseUrl: string;
	private timeout: number;
	private apiKey: string;
	private jwtToken: string | null = null;
	private tokenExpiresAt: number = 0;

	constructor(config: GiantContextConfig) {
		this.apiKey = config.apiKey;
		this.baseUrl = (config.baseUrl || "https://api.giantcontext.com").replace(
			/\/$/,
			"",
		);
		this.timeout = config.timeout || 30000;
	}

	private async fetchWithTimeout(
		url: string,
		init?: RequestInit,
	): Promise<Response> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url, {
				...init,
				signal: controller.signal,
				headers: {
					"Content-Type": "application/json",
					...(init?.headers as Record<string, string>),
				},
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

	private async getToken(): Promise<string> {
		if (this.jwtToken && Date.now() < this.tokenExpiresAt - 60000) {
			return this.jwtToken;
		}

		const response = await this.fetchWithTimeout(
			`${this.baseUrl}/auth/token`,
			{
				method: "POST",
				body: JSON.stringify({ apiKey: this.apiKey }),
			},
		);

		const data = (await response.json()) as {
			token: string;
			expiresAt: string;
		};
		this.jwtToken = data.token;
		this.tokenExpiresAt = new Date(data.expiresAt).getTime();

		return this.jwtToken;
	}

	async request<T>(url: string, options: RequestOptions): Promise<T> {
		const token = await this.getToken();

		let path = `${this.baseUrl}${url}`;
		if (options.params) {
			const searchParams = new URLSearchParams();
			for (const [key, value] of Object.entries(options.params)) {
				if (value !== undefined && value !== null) {
					searchParams.set(key, String(value));
				}
			}
			const qs = searchParams.toString();
			if (qs) path += `?${qs}`;
		}

		const response = await this.fetchWithTimeout(path, {
			method: options.method,
			headers: { Authorization: `Bearer ${token}` },
			body: options.data ? JSON.stringify(options.data) : undefined,
		});

		if (response.status === 204) return undefined as T;
		return response.json() as Promise<T>;
	}
}

// ============================================================================
// SDK Factory
// ============================================================================

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
export class GiantContext {
	private client: GiantContextClient;

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

	constructor(config: GiantContextConfig) {
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
			this.client,
		);
		this.projectMembers = new ProjectMembersResource(this.client);
		this.projectTrash = new ProjectTrashResource(this.client);
		this.projectWorkflows = new ProjectWorkflowsResource(this.client);
		this.projects = new ProjectsResource(this.client);
		this.website = new WebsiteResource(this.client);
	}
}

/**
 * Create a GiantContext SDK instance
 */
export const createGiantContext = (
	config: GiantContextConfig,
): GiantContext => {
	return new GiantContext(config);
};

export default createGiantContext;
