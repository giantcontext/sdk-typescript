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
		organizationId,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		organizationId?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			name: unknown;
			keyPrefix: unknown;
			organizationId: unknown;
			createdAt: unknown;
			lastUsedAt: unknown;
			expiresAt: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/me/api-keys`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			organizationId,
		});
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
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
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
		userId,
	}: {
		organizationId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		userId?: string;
	}): Promise<{
		data: Array<Record<string, unknown>>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/api-keys`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			userId,
		});
		return this.request<{
			data: Array<Record<string, unknown>>;
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
 * App Members API methods
 */
class AppMembersResource extends BaseResource {
	/**
	 * Get an app member by ID
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/members/{memberId}
	 */
	getAppMember = async ({
		organizationId,
		projectId,
		appId,
		memberId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members/${encodeURIComponent(String(memberId))}`;
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
		role,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		role?: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/members`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			role,
		});
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Briefs API methods
 */
class BriefsResource extends BaseResource {
	/**
	 * Approve a ready brief, which starts draft generation from its draft prompt
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/approve
	 */
	approveBrief = async ({
		organizationId,
		projectId,
		briefId,
	}: {
		organizationId: string;
		projectId: string;
		briefId: string;
	}): Promise<{
		id: string;
		organizationId: string;
		projectId: string;
		appId?: string;
		ideaId: string;
		contractId?: string;
		contentType?: string;
		operationKey?: string;
		targetContentType?: string;
		status: unknown;
		stream?: unknown;
		discovery?: unknown;
		plan?: unknown;
		design?: unknown;
		audit?: unknown;
		retryHistory?: unknown;
		draftPrompt?: string;
		artifactPlan?: unknown;
		rejectionReason?: string;
		errorMessage?: string;
		metadata?: unknown;
		startedAt?: string;
		completedAt?: string;
		reviewedBy?: string;
		reviewedAt?: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}/approve`;
		return this.request<{
			id: string;
			organizationId: string;
			projectId: string;
			appId?: string;
			ideaId: string;
			contractId?: string;
			contentType?: string;
			operationKey?: string;
			targetContentType?: string;
			status: unknown;
			stream?: unknown;
			discovery?: unknown;
			plan?: unknown;
			design?: unknown;
			audit?: unknown;
			retryHistory?: unknown;
			draftPrompt?: string;
			artifactPlan?: unknown;
			rejectionReason?: string;
			errorMessage?: string;
			metadata?: unknown;
			startedAt?: string;
			completedAt?: string;
			reviewedBy?: string;
			reviewedAt?: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Reject a ready brief so it never reaches draft generation
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/reject
	 */
	rejectBrief = async ({
		organizationId,
		projectId,
		briefId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		briefId: string;
		data: {
			reason?: string;
		};
	}): Promise<{
		id: string;
		organizationId: string;
		projectId: string;
		appId?: string;
		ideaId: string;
		contractId?: string;
		contentType?: string;
		operationKey?: string;
		targetContentType?: string;
		status: unknown;
		stream?: unknown;
		discovery?: unknown;
		plan?: unknown;
		design?: unknown;
		audit?: unknown;
		retryHistory?: unknown;
		draftPrompt?: string;
		artifactPlan?: unknown;
		rejectionReason?: string;
		errorMessage?: string;
		metadata?: unknown;
		startedAt?: string;
		completedAt?: string;
		reviewedBy?: string;
		reviewedAt?: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}/reject`;
		return this.request<{
			id: string;
			organizationId: string;
			projectId: string;
			appId?: string;
			ideaId: string;
			contractId?: string;
			contentType?: string;
			operationKey?: string;
			targetContentType?: string;
			status: unknown;
			stream?: unknown;
			discovery?: unknown;
			plan?: unknown;
			design?: unknown;
			audit?: unknown;
			retryHistory?: unknown;
			draftPrompt?: string;
			artifactPlan?: unknown;
			rejectionReason?: string;
			errorMessage?: string;
			metadata?: unknown;
			startedAt?: string;
			completedAt?: string;
			reviewedBy?: string;
			reviewedAt?: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one brief's full paper trail from idea to draft prompt
	 * @method GET /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}
	 */
	getBrief = async ({
		organizationId,
		projectId,
		briefId,
	}: {
		organizationId: string;
		projectId: string;
		briefId: string;
	}): Promise<{
		id: string;
		organizationId: string;
		projectId: string;
		appId?: string;
		ideaId: string;
		contractId?: string;
		contentType?: string;
		operationKey?: string;
		targetContentType?: string;
		status: unknown;
		stream?: unknown;
		discovery?: unknown;
		plan?: unknown;
		design?: unknown;
		audit?: unknown;
		retryHistory?: unknown;
		draftPrompt?: string;
		artifactPlan?: unknown;
		rejectionReason?: string;
		errorMessage?: string;
		metadata?: unknown;
		startedAt?: string;
		completedAt?: string;
		reviewedBy?: string;
		reviewedAt?: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/briefs/${encodeURIComponent(String(briefId))}`;
		return this.request<{
			id: string;
			organizationId: string;
			projectId: string;
			appId?: string;
			ideaId: string;
			contractId?: string;
			contentType?: string;
			operationKey?: string;
			targetContentType?: string;
			status: unknown;
			stream?: unknown;
			discovery?: unknown;
			plan?: unknown;
			design?: unknown;
			audit?: unknown;
			retryHistory?: unknown;
			draftPrompt?: string;
			artifactPlan?: unknown;
			rejectionReason?: string;
			errorMessage?: string;
			metadata?: unknown;
			startedAt?: string;
			completedAt?: string;
			reviewedBy?: string;
			reviewedAt?: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		completedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		status?: string;
		contentType?: string;
		targetContentType?: string;
		ideaId?: string;
		createdAt?: string;
		updatedAt?: string;
		startedAt?: string;
		completedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			organizationId: unknown;
			projectId: unknown;
			appId?: unknown;
			ideaId: unknown;
			contractId?: unknown;
			contentType?: unknown;
			operationKey?: unknown;
			targetContentType?: unknown;
			status: unknown;
			stream?: unknown;
			discovery?: unknown;
			plan?: unknown;
			design?: unknown;
			audit?: unknown;
			retryHistory?: unknown;
			draftPrompt?: unknown;
			artifactPlan?: unknown;
			rejectionReason?: unknown;
			errorMessage?: unknown;
			metadata?: unknown;
			startedAt?: unknown;
			completedAt?: unknown;
			reviewedBy?: unknown;
			reviewedAt?: unknown;
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
			completedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				organizationId: unknown;
				projectId: unknown;
				appId?: unknown;
				ideaId: unknown;
				contractId?: unknown;
				contentType?: unknown;
				operationKey?: unknown;
				targetContentType?: unknown;
				status: unknown;
				stream?: unknown;
				discovery?: unknown;
				plan?: unknown;
				design?: unknown;
				audit?: unknown;
				retryHistory?: unknown;
				draftPrompt?: unknown;
				artifactPlan?: unknown;
				rejectionReason?: unknown;
				errorMessage?: unknown;
				metadata?: unknown;
				startedAt?: unknown;
				completedAt?: unknown;
				reviewedBy?: unknown;
				reviewedAt?: unknown;
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
 * Bug Reports API methods
 */
class BugReportsResource extends BaseResource {
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
		createdAt,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		severity?: string;
		source?: string;
		reportCount?: string;
		createdAt?: string;
	}): Promise<{
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
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			createdAt,
		});
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
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
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
		createdAt,
	}: {
		bugReportId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		author?: string;
		source?: string;
		createdAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			comment: unknown;
			author: unknown;
			createdAt: unknown;
			source: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/me/bug-reports/${encodeURIComponent(String(bugReportId))}/comments`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			author,
			source,
			createdAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				comment: unknown;
				author: unknown;
				createdAt: unknown;
				source: unknown;
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
 * Builder API methods
 */
class BuilderResource extends BaseResource {
	/**
	 * Get every content type and the blocks allowed in it
	 * @method GET /builder/content-types
	 */
	getContentTypes = async (): Promise<{
		contentTypes: Array<{
			contentType: unknown;
			context: unknown;
			blocks: unknown;
		}>;
	}> => {
		const endpoint = `/builder/content-types`;
		return this.request<{
			contentTypes: Array<{
				contentType: unknown;
				context: unknown;
				blocks: unknown;
			}>;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get the styles schema shared by every block
	 * @method GET /builder/styles
	 */
	getBlockStyles = async (): Promise<{
		styles: unknown;
	}> => {
		const endpoint = `/builder/styles`;
		return this.request<{
			styles: unknown;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Get one block type's own fields and hints; shared styles come from getBlockStyles
	 * @method GET /builder/blocks/{blockType}
	 */
	getBlock = async ({
		blockType,
		contentType,
	}: {
		blockType: string;
		contentType: string;
	}): Promise<{
		type: string;
		schema: unknown;
		hints: Record<string, unknown>;
	}> => {
		const endpoint = `/builder/blocks/${encodeURIComponent(String(blockType))}`;
		const params = this.cleanParams({ contentType });
		return this.request<{
			type: string;
			schema: unknown;
			hints: Record<string, unknown>;
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Delete a section and every block inside it; recoverable from version history
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/delete
	 */
	deleteSection = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			sectionId: string;
		};
	}): Promise<{
		section: unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/delete`;
		return this.request<{
			section: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Insert a section into a content tree
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/insert
	 */
	insertSection = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			section?: Record<string, unknown>;
			afterSectionId?: string;
			beforeSectionId?: string;
		};
	}): Promise<{
		section: unknown;
		position: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/insert`;
		return this.request<{
			section: unknown;
			position: number;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Update a section's own properties; blocks stay untouched and columns cannot be patched
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/update
	 */
	updateSection = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			sectionId: string;
			patch: Record<string, unknown>;
		};
	}): Promise<{
		section: unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/update`;
		return this.request<{
			section: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Delete a block, returning it; the prior tree stays in version history
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/delete
	 */
	deleteBlock = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			blockId: string;
		};
	}): Promise<{
		block: unknown;
		sectionRemoved?: string;
		columnRemoved?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/delete`;
		return this.request<{
			block: unknown;
			sectionRemoved?: string;
			columnRemoved?: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Insert a block into a content tree
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/insert
	 */
	insertBlock = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			type: string;
			data: Record<string, unknown>;
			styles?: Record<string, unknown>;
			afterBlockId?: string;
			beforeBlockId?: string;
			intoSectionId?: string;
			columnId?: string;
		};
	}): Promise<{
		block: unknown;
		sectionId: string;
		columnId: string;
		position: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/insert`;
		return this.request<{
			block: unknown;
			sectionId: string;
			columnId: string;
			position: number;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Update a block's data and/or styles by merging only the fields you send; null clears a field
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/update
	 */
	updateBlock = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			blockId: string;
			data?: Record<string, unknown>;
			styles?: Record<string, unknown>;
		};
	}): Promise<{
		block: unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/update`;
		return this.request<{
			block: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Move a section before or after a sibling, or append it at the end
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/sections/move
	 */
	moveSection = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			sectionId: string;
			afterSectionId?: string;
			beforeSectionId?: string;
		};
	}): Promise<{
		section: unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/sections/move`;
		return this.request<{
			section: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Move a block beside a sibling or into a section, leaving its data unchanged
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/blocks/move
	 */
	moveBlock = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			blockId: string;
			afterBlockId?: string;
			beforeBlockId?: string;
			intoSectionId?: string;
			columnId?: string;
		};
	}): Promise<{
		block: unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/blocks/move`;
		return this.request<{
			block: unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Return a published item to draft — status only, never the body
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/unpublish
	 */
	unpublishContent = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			publishAt?: string | unknown;
		};
	}): Promise<{
		contentType: string;
		contentId: string;
		status: string;
		alreadyInState: boolean;
		scheduledPublishAt?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/unpublish`;
		return this.request<{
			contentType: string;
			contentId: string;
			status: string;
			alreadyInState: boolean;
			scheduledPublishAt?: string | unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Publish a page, post, article, doc or email — status only, never the body
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/publish
	 */
	publishContent = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
			publishAt?: string | unknown;
		};
	}): Promise<{
		contentType: string;
		contentId: string;
		status: string;
		alreadyInState: boolean;
		scheduledPublishAt?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/publish`;
		return this.request<{
			contentType: string;
			contentId: string;
			status: string;
			alreadyInState: boolean;
			scheduledPublishAt?: string | unknown;
		}>(endpoint, { method: "POST", data });
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
		limit,
	}: {
		organizationId: string;
		projectId: string;
		query?: string;
		blockTypes?: string;
		contentTypes?: string;
		status?: string;
		limit?: string;
	}): Promise<{
		matches: Array<{
			contentId: unknown;
			contentType: unknown;
			name: unknown;
			slug: unknown;
			sectionId: unknown;
			columnId: unknown;
			sectionRole: unknown;
			blockId: unknown;
			blockType: unknown;
			matchIn: unknown;
			field: unknown;
			locale: unknown;
			snippet: unknown;
		}>;
		count: number;
		total: number;
		truncated: boolean;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/search`;
		const params = this.cleanParams({
			query,
			blockTypes,
			contentTypes,
			status,
			limit,
		});
		return this.request<{
			matches: Array<{
				contentId: unknown;
				contentType: unknown;
				name: unknown;
				slug: unknown;
				sectionId: unknown;
				columnId: unknown;
				sectionRole: unknown;
				blockId: unknown;
				blockType: unknown;
				matchIn: unknown;
				field: unknown;
				locale: unknown;
				snippet: unknown;
			}>;
			count: number;
			total: number;
			truncated: boolean;
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get a content tree for editing
	 * @method GET /organizations/{organizationId}/projects/{projectId}/content
	 */
	getContent = async ({
		organizationId,
		projectId,
		contentType,
		contentId,
	}: {
		organizationId: string;
		projectId: string;
		contentType: string;
		contentId: string;
	}): Promise<{
		content: Array<Record<string, unknown>>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content`;
		const params = this.cleanParams({ contentType, contentId });
		return this.request<{
			content: Array<Record<string, unknown>>;
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * CRM API methods
 */
class CRMResource extends BaseResource {
	/**
	 * Get one activity's description, writing app and JSON data payload
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
		writtenBy?: string | unknown;
		description: string;
		data?: Record<string, unknown>;
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
			writtenBy?: string | unknown;
			description: string;
			data?: Record<string, unknown>;
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
		createdAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		contactId?: string;
		companyId?: string;
		writtenBy?: string;
		createdAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			contactId?: unknown;
			companyId?: unknown;
			writtenBy?: unknown;
			description: unknown;
			data?: unknown;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			contactId,
			companyId,
			writtenBy,
			createdAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				contactId?: unknown;
				companyId?: unknown;
				writtenBy?: unknown;
				description: unknown;
				data?: unknown;
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
	 * Log a past-tense sentence onto a contact or company timeline, append-only
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
			writtenBy?: string;
			contactId?: string;
			companyId?: string;
			data?: Record<string, unknown>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/activities`;
		return this.request<unknown>(endpoint, { method: "POST", data });
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
		contactId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		companyId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		writtenBy?: string;
		contactId?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			contactId?: unknown;
			companyId?: unknown;
			writtenBy?: unknown;
			description: unknown;
			data?: unknown;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/companies/${encodeURIComponent(String(companyId))}/activities`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			writtenBy,
			contactId,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				contactId?: unknown;
				companyId?: unknown;
				writtenBy?: unknown;
				description: unknown;
				data?: unknown;
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
		emailSubscribed,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		companyId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		source?: string;
		title?: string;
		department?: string;
		email?: string;
		emailSubscribed?: string;
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
			properties?: unknown;
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
			emailSubscribed,
		});
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
				properties?: unknown;
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
	 * Get one company with its profile fields and count of linked contacts
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
		address?: {
			street?: string;
			city?: string;
			state?: string;
			country?: string;
			postalCode?: string;
		};
		properties?: Record<string, unknown>;
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
			address?: {
				street?: string;
				city?: string;
				state?: string;
				country?: string;
				postalCode?: string;
			};
			properties?: Record<string, unknown>;
			tags: Array<string>;
			contactCount?: number;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		website,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		industry?: string;
		size?: string;
		email?: string;
		website?: string;
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
			address?: unknown;
			properties?: unknown;
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
			website,
		});
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
				address?: unknown;
				properties?: unknown;
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
		companyId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		contactId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		writtenBy?: string;
		companyId?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			contactId?: unknown;
			companyId?: unknown;
			writtenBy?: unknown;
			description: unknown;
			data?: unknown;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/crm/${encodeURIComponent(String(appId))}/contacts/${encodeURIComponent(String(contactId))}/activities`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			writtenBy,
			companyId,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				contactId?: unknown;
				companyId?: unknown;
				writtenBy?: unknown;
				description: unknown;
				data?: unknown;
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
	 * Set one key in a contact's custom properties, merging without clobbering siblings
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
		properties?: Record<string, unknown>;
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
			properties?: Record<string, unknown>;
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
	 * Get one contact with all fields, tags and its linked company
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
		properties?: Record<string, unknown>;
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
			properties?: Record<string, unknown>;
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
	 * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}
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
		properties?: Record<string, unknown>;
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
			properties?: Record<string, unknown>;
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
		}>(endpoint, { method: "PATCH", data });
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
		properties?: Record<string, unknown>;
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
			properties?: Record<string, unknown>;
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
	 * Untag one contact, one tag per call, idempotent, returns the updated contact
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
		properties?: Record<string, unknown>;
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
			properties?: Record<string, unknown>;
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
		locale,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		companyId?: string;
		status?: string;
		source?: string;
		title?: string;
		department?: string;
		email?: string;
		emailSubscribed?: string;
		locale?: string;
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
			properties?: unknown;
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
			locale,
		});
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
				properties?: unknown;
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
		userId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		visitorId?: string;
		userId?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			visitorId,
			userId,
		});
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
 * Content Versions API methods
 */
class ContentVersionsResource extends BaseResource {
	/**
	 * Restore an entity to an older version; non-destructive, forward history is kept
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}/restore
	 */
	restoreContentVersion = async ({
		organizationId,
		projectId,
		versionId,
	}: {
		organizationId: string;
		projectId: string;
		versionId: string;
	}): Promise<{
		contentType: string;
		contentId: string;
		restoredFromVersion: number;
		newVersion: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content-versions/${encodeURIComponent(String(versionId))}/restore`;
		return this.request<{
			contentType: string;
			contentId: string;
			restoredFromVersion: number;
			newVersion: number;
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Get one version's full content snapshot, which the list tool omits
	 * @method GET /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}
	 */
	getContentVersion = async ({
		organizationId,
		projectId,
		versionId,
	}: {
		organizationId: string;
		projectId: string;
		versionId: string;
	}): Promise<{
		id: string;
		contentType: string;
		contentId: string;
		version: number;
		source: string;
		createdBy: string | unknown;
		summary: string | unknown;
		createdAt: string;
		content: Array<Record<string, unknown>>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content-versions/${encodeURIComponent(String(versionId))}`;
		return this.request<{
			id: string;
			contentType: string;
			contentId: string;
			version: number;
			source: string;
			createdBy: string | unknown;
			summary: string | unknown;
			createdAt: string;
			content: Array<Record<string, unknown>>;
		}>(endpoint, { method: "GET" });
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
		contentId,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		source?: string;
		createdBy?: string;
		version?: string;
		createdAt?: string;
		contentType: string;
		contentId: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			contentType: unknown;
			contentId: unknown;
			version: unknown;
			source: unknown;
			createdBy: unknown;
			summary: unknown;
			createdAt: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			contentId,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				contentType: unknown;
				contentId: unknown;
				version: unknown;
				source: unknown;
				createdBy: unknown;
				summary: unknown;
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
}

/**
 * Developers API methods
 */
class DevelopersResource extends BaseResource {
	/**
	 * Get one category's own fields; its docs come from listDevelopersDocs with categoryId
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
	 * Delete developer doc category
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}
	 */
	deleteDevelopersDocCategory = async ({
		organizationId,
		projectId,
		appId,
		categoryId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
		data: {
			name?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
		};
	}): Promise<Record<string, unknown>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<Record<string, unknown>>(endpoint, {
			method: "PATCH",
			data,
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
		icon,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		slug?: string;
		icon?: string;
	}): Promise<{
		data: Array<Record<string, unknown>>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			slug,
			icon,
		});
		return this.request<{
			data: Array<Record<string, unknown>>;
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Create a doc category before the docs that reference it; slug must be unique
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories
	 */
	createDevelopersDocCategory = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: unknown;
			slug: string;
			description?: unknown;
			parentId?: string | unknown;
			order?: number;
			icon?: string | unknown;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/categories`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one doc with its full content, SEO and category ids
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
		content?: Array<Record<string, unknown>>;
		excerpt?: unknown;
		status: "draft" | "published";
		isPublic: boolean;
		order: number;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		featuredImageUrl?: string | unknown;
		tags?: Array<string>;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
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
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status: "draft" | "published";
			isPublic: boolean;
			order: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
			publishedAt?: string | unknown;
			categoryIds?: Array<string>;
			url?: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete developer doc
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}
	 */
	deleteDevelopersDoc = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs/${encodeURIComponent(String(docId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		docId: string;
		data: {
			name?: string;
			title?: string | Record<string, unknown> | unknown;
			slug?: string;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			excerpt?: string | Record<string, unknown> | unknown;
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		id: string;
		appId: string;
		name: string;
		title?: unknown;
		slug: string;
		content?: Array<Record<string, unknown>>;
		excerpt?: unknown;
		status: "draft" | "published";
		isPublic: boolean;
		order: number;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		featuredImageUrl?: string | unknown;
		tags?: Array<string>;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
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
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status: "draft" | "published";
			isPublic: boolean;
			order: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
			publishedAt?: string | unknown;
			categoryIds?: Array<string>;
			url?: string;
		}>(endpoint, { method: "PATCH", data });
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
		categoryId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		isPublic?: string;
		categoryId?: string;
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
			isPublic: unknown;
			order: unknown;
			seo?: unknown;
			featuredImageUrl?: unknown;
			tags?: unknown;
			websiteAppId?: unknown;
			layoutId?: unknown;
			headerId?: unknown;
			footerId?: unknown;
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
			lite,
			sort,
			search,
			status,
			isPublic,
			categoryId,
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
				isPublic: unknown;
				order: unknown;
				seo?: unknown;
				featuredImageUrl?: unknown;
				tags?: unknown;
				websiteAppId?: unknown;
				layoutId?: unknown;
				headerId?: unknown;
				footerId?: unknown;
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
	 * Create a doc; slug must be unique, status defaults to draft, isPublic to true
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs
	 */
	createDevelopersDoc = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			title?: unknown;
			slug: string;
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status?: "draft" | "published";
			isPublic?: boolean;
			order?: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			categoryIds?: Array<string>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/docs`;
		return this.request<unknown>(endpoint, { method: "POST", data });
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
		draftId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
			};
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
		locale?: string;
		draftId?: string;
	}): Promise<{
		content?: Array<Record<string, unknown>>;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
		};
		isPublic?: boolean;
		draftId?: string | unknown;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/landing`;
		const params = this.cleanParams({ locale, draftId });
		return this.request<{
			content?: Array<Record<string, unknown>>;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
			};
			isPublic?: boolean;
			draftId?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		}>(endpoint, { method: "PATCH", data, params });
	};

	/**
	 * Get one URL redirect by id
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/redirects/{redirectId}
	 */
	getDevelopersRedirect = async ({
		organizationId,
		projectId,
		appId,
		redirectId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		redirectId: string;
	}): Promise<{
		id: string;
		appId: string;
		fromPath: string;
		toPath: string;
		status: number;
		source: "auto" | "manual";
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/developers/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
		return this.request<{
			id: string;
			appId: string;
			fromPath: string;
			toPath: string;
			status: number;
			source: "auto" | "manual";
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		source?: string;
		status?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			fromPath: unknown;
			toPath: unknown;
			status: unknown;
			source: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				fromPath: unknown;
				toPath: unknown;
				status: unknown;
				source: unknown;
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
	 * Get the SDK and OpenAPI sync status and recent runs; diagnostic only, starts nothing
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs
	 */
	getDevelopersSyncLogs = async ({
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
	 * Unarchive a draft back into the default list; already-unarchived is a no-op
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/unarchive
	 */
	unarchiveDraft = async ({
		organizationId,
		projectId,
		draftId,
	}: {
		organizationId: string;
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
		packageId?: string | unknown;
		packageName?: string | unknown;
		pendingDependencyCount?: number;
		draftPackage?:
			| {
					id: string;
					organizationId: string;
					projectId: string;
					sourceType?: string | unknown;
					sourceId?: string | unknown;
					name?: string | unknown;
					status: "active" | "resolved" | "archived";
					metadata: Record<string, unknown>;
					createdBy?: string | unknown;
					createdAt: string;
					updatedAt: string;
			  }
			| unknown;
		dependencies?: Array<{
			id: unknown;
			dependentDraftId: unknown;
			requiredDraftId: unknown;
			dependencyType: unknown;
			blockedAction: unknown;
			status: unknown;
			metadata: unknown;
			satisfiedAt?: unknown;
			createdAt: unknown;
			updatedAt: unknown;
		}>;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/unarchive`;
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
			packageId?: string | unknown;
			packageName?: string | unknown;
			pendingDependencyCount?: number;
			draftPackage?:
				| {
						id: string;
						organizationId: string;
						projectId: string;
						sourceType?: string | unknown;
						sourceId?: string | unknown;
						name?: string | unknown;
						status: "active" | "resolved" | "archived";
						metadata: Record<string, unknown>;
						createdBy?: string | unknown;
						createdAt: string;
						updatedAt: string;
				  }
				| unknown;
			dependencies?: Array<{
				id: unknown;
				dependentDraftId: unknown;
				requiredDraftId: unknown;
				dependencyType: unknown;
				blockedAction: unknown;
				status: unknown;
				metadata: unknown;
				satisfiedAt?: unknown;
				createdAt: unknown;
				updatedAt: unknown;
			}>;
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
	 * Archive an accepted draft to hide it from the default list without deleting
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/archive
	 */
	archiveDraft = async ({
		organizationId,
		projectId,
		draftId,
	}: {
		organizationId: string;
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
		packageId?: string | unknown;
		packageName?: string | unknown;
		pendingDependencyCount?: number;
		draftPackage?:
			| {
					id: string;
					organizationId: string;
					projectId: string;
					sourceType?: string | unknown;
					sourceId?: string | unknown;
					name?: string | unknown;
					status: "active" | "resolved" | "archived";
					metadata: Record<string, unknown>;
					createdBy?: string | unknown;
					createdAt: string;
					updatedAt: string;
			  }
			| unknown;
		dependencies?: Array<{
			id: unknown;
			dependentDraftId: unknown;
			requiredDraftId: unknown;
			dependencyType: unknown;
			blockedAction: unknown;
			status: unknown;
			metadata: unknown;
			satisfiedAt?: unknown;
			createdAt: unknown;
			updatedAt: unknown;
		}>;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}/archive`;
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
			packageId?: string | unknown;
			packageName?: string | unknown;
			pendingDependencyCount?: number;
			draftPackage?:
				| {
						id: string;
						organizationId: string;
						projectId: string;
						sourceType?: string | unknown;
						sourceId?: string | unknown;
						name?: string | unknown;
						status: "active" | "resolved" | "archived";
						metadata: Record<string, unknown>;
						createdBy?: string | unknown;
						createdAt: string;
						updatedAt: string;
				  }
				| unknown;
			dependencies?: Array<{
				id: unknown;
				dependentDraftId: unknown;
				requiredDraftId: unknown;
				dependencyType: unknown;
				blockedAction: unknown;
				status: unknown;
				metadata: unknown;
				satisfiedAt?: unknown;
				createdAt: unknown;
				updatedAt: unknown;
			}>;
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
	 * Generate AI edits to existing content; async, returns a pending draftId to poll
	 * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/edit
	 */
	generateEditDraft = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			prompt: string;
			resourceId: string;
			appId?: string;
			contentType?: string;
			packageId?: string;
			draftPackage?: {
				id?: string;
				name?: string;
				sourceType?: string;
				sourceId?: string;
				metadata?: Record<string, unknown>;
			};
			dependencies?: Array<{
				requiredDraftId: unknown;
				dependencyType?: unknown;
				blockedAction?: unknown;
				metadata?: unknown;
			}>;
		};
	}): Promise<{
		draftId: string;
		status: unknown;
		packageId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/generate/edit`;
		return this.request<{
			draftId: string;
			status: unknown;
			packageId?: string | unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one draft with its prompt, generated content and status; poll while pending
	 * @method GET /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}
	 */
	getDraft = async ({
		organizationId,
		projectId,
		draftId,
		lite,
	}: {
		organizationId: string;
		projectId: string;
		draftId: string;
		lite?: string;
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
		packageId?: string | unknown;
		packageName?: string | unknown;
		pendingDependencyCount?: number;
		draftPackage?:
			| {
					id: string;
					organizationId: string;
					projectId: string;
					sourceType?: string | unknown;
					sourceId?: string | unknown;
					name?: string | unknown;
					status: "active" | "resolved" | "archived";
					metadata: Record<string, unknown>;
					createdBy?: string | unknown;
					createdAt: string;
					updatedAt: string;
			  }
			| unknown;
		dependencies?: Array<{
			id: unknown;
			dependentDraftId: unknown;
			requiredDraftId: unknown;
			dependencyType: unknown;
			blockedAction: unknown;
			status: unknown;
			metadata: unknown;
			satisfiedAt?: unknown;
			createdAt: unknown;
			updatedAt: unknown;
		}>;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
		const params = this.cleanParams({ lite });
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
			packageId?: string | unknown;
			packageName?: string | unknown;
			pendingDependencyCount?: number;
			draftPackage?:
				| {
						id: string;
						organizationId: string;
						projectId: string;
						sourceType?: string | unknown;
						sourceId?: string | unknown;
						name?: string | unknown;
						status: "active" | "resolved" | "archived";
						metadata: Record<string, unknown>;
						createdBy?: string | unknown;
						createdAt: string;
						updatedAt: string;
				  }
				| unknown;
			dependencies?: Array<{
				id: unknown;
				dependentDraftId: unknown;
				requiredDraftId: unknown;
				dependencyType: unknown;
				blockedAction: unknown;
				status: unknown;
				metadata: unknown;
				satisfiedAt?: unknown;
				createdAt: unknown;
				updatedAt: unknown;
			}>;
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Delete a rejected, failed or cancelled draft permanently; other statuses return 409
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}
	 */
	deleteDraft = async ({
		organizationId,
		projectId,
		draftId,
	}: {
		organizationId: string;
		projectId: string;
		draftId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/drafts/${encodeURIComponent(String(draftId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
	};

	/**
	 * Generate new content from a prompt; async, takes 5-15 minutes, nothing publishes yet
	 * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/new
	 */
	generateNewDraft = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			prompt: string;
			appId?: string;
			contentType?: string;
			packageId?: string;
			draftPackage?: {
				id?: string;
				name?: string;
				sourceType?: string;
				sourceId?: string;
				metadata?: Record<string, unknown>;
			};
			dependencies?: Array<{
				requiredDraftId: unknown;
				dependencyType?: unknown;
				blockedAction?: unknown;
				metadata?: unknown;
			}>;
			resourceId?: unknown;
		};
	}): Promise<{
		draftId: string;
		status: unknown;
		packageId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/generate/new`;
		return this.request<{
			draftId: string;
			status: unknown;
			packageId?: string | unknown;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Create a copy-on-write draft of existing content for manual editing, no AI
	 * @method POST /organizations/{organizationId}/projects/{projectId}/drafts/edit
	 */
	createEditDraft = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			resourceId: string;
			prompt?: string;
		};
	}): Promise<{
		draftId: string;
		status: unknown;
		packageId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/drafts/edit`;
		return this.request<{
			draftId: string;
			status: unknown;
			packageId?: string | unknown;
		}>(endpoint, { method: "POST", data });
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
		includeArchived,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		name?: string;
		prompt?: string;
		contentType?: string;
		createdAt?: string;
		updatedAt?: string;
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
			packageId?: unknown;
			packageName?: unknown;
			pendingDependencyCount?: unknown;
			draftPackage?: unknown;
			dependencies?: unknown;
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
				packageId?: unknown;
				packageName?: unknown;
				pendingDependencyCount?: unknown;
				draftPackage?: unknown;
				dependencies?: unknown;
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
	 * Get one contact's sent and planned emails with per-send opens and clicks
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
	 * Get one email with its full content blocks and header/footer links
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
		content?: Array<Record<string, unknown>>;
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
			content?: Array<Record<string, unknown>>;
			compiledHtml?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete email
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}
	 */
	deleteEmail = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/emails/${encodeURIComponent(String(emailId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		data: {
			name?: string;
			slug?: string;
			subject?: unknown | unknown;
			triggerDescription?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		id: string;
		appId: string;
		name: string;
		slug: string;
		subject?: unknown | unknown;
		triggerDescription?: string | unknown;
		status: "draft" | "published";
		content?: Array<Record<string, unknown>>;
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
			content?: Array<Record<string, unknown>>;
			compiledHtml?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "PATCH", data });
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
	 * Unsubscribe a contact from one email; the row is kept for resubscribe
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
		unsubscribedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		emailId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		contactId?: string;
		subscribedAt?: string;
		unsubscribedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			contactId,
			subscribedAt,
			unsubscribedAt,
		});
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
	 * Subscribe a CRM contact to one email; resubscribes if previously unsubscribed
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
		footerId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		slug?: string;
		name?: string;
		headerId?: string;
		footerId?: string;
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
			footerId,
		});
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
	 * Get one footer's block content in full; listEmailFooters lite=true returns metadata only
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete email footer
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}
	 */
	deleteEmailFooter = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		name,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
		});
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
	 * Create a footer shell; only name is required, add blocks afterwards
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers
	 */
	createEmailFooter = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/footers`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one header's full block tree; no lite mode, so expect heavy output
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete email header
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}
	 */
	deleteEmailHeader = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdAt?: string;
		updatedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			createdAt,
			updatedAt,
		});
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
	 * Create a header shell; only name is required, add blocks afterwards
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers
	 */
	createEmailHeader = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/email/${encodeURIComponent(String(appId))}/headers`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one send with its full delivery and engagement event log
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
	 * Update a send to reschedule or cancel; only planned and queued rows accept edits
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
		recipientEmail,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		emailId?: string;
		contactId?: string;
		status?: string;
		locale?: string;
		recipientEmail?: string;
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
			lite,
			sort,
			search,
			emailId,
			contactId,
			status,
			locale,
			recipientEmail,
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
	 * Create a send for one contact; defaults to planned, which sends nothing until queued
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
		createdAt,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		priority?: string;
		voteCount?: string;
		createdAt?: string;
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
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			createdAt,
		});
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
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
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
		createdAt,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		priority?: string;
		source?: string;
		voteCount?: string;
		createdAt?: string;
	}): Promise<{
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
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			createdAt,
		});
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
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
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
		createdAt,
	}: {
		featureRequestId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		author?: string;
		source?: string;
		createdAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			comment: unknown;
			author: unknown;
			createdAt: unknown;
			source: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/me/feature-requests/${encodeURIComponent(String(featureRequestId))}/comments`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			author,
			source,
			createdAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				comment: unknown;
				author: unknown;
				createdAt: unknown;
				source: unknown;
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
 * Forms API methods
 */
class FormsResource extends BaseResource {
	/**
	 * Get one form's fields, settings and content blocks in Builder format
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
		fields?: Array<{
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
		content?: Array<Record<string, unknown>>;
		settings?: {
			submitButtonText?: string;
			successMessage?: string | Record<string, unknown>;
			gcUrlRedirect?: string;
			hideFormOnComplete?: boolean;
			closeDialogOnComplete?: boolean;
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
			fields?: Array<{
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
			content?: Array<Record<string, unknown>>;
			settings?: {
				submitButtonText?: string;
				successMessage?: string | Record<string, unknown>;
				gcUrlRedirect?: string;
				hideFormOnComplete?: boolean;
				closeDialogOnComplete?: boolean;
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
	 * Delete form
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}
	 */
	deleteForm = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/forms/${encodeURIComponent(String(appId))}/forms/${encodeURIComponent(String(formId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		formId: string;
		data: {
			settings?: {
				submitButtonText?: string;
				successMessage?: string | Record<string, unknown>;
				gcUrlRedirect?: string;
				hideFormOnComplete?: boolean;
				closeDialogOnComplete?: boolean;
				maxSubmissions?: number;
				submissionLimit?: "none" | "once_per_user";
				theme?: "default" | "minimal" | "card";
				tags?: Array<unknown>;
				source?: string;
			};
			name?: string;
			description?: string | unknown;
		};
	}): Promise<{
		id: string;
		appId: string;
		name: string;
		slug: string;
		description?: string | unknown;
		fields?: Array<{
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
		content?: Array<Record<string, unknown>>;
		settings?: {
			submitButtonText?: string;
			successMessage?: string | Record<string, unknown>;
			gcUrlRedirect?: string;
			hideFormOnComplete?: boolean;
			closeDialogOnComplete?: boolean;
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
			fields?: Array<{
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
			content?: Array<Record<string, unknown>>;
			settings?: {
				submitButtonText?: string;
				successMessage?: string | Record<string, unknown>;
				gcUrlRedirect?: string;
				hideFormOnComplete?: boolean;
				closeDialogOnComplete?: boolean;
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
		}>(endpoint, { method: "PATCH", data });
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
		data?: Record<string, unknown>;
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
			data?: Record<string, unknown>;
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
		createdAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		formId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		createdAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			formId: unknown;
			data?: unknown;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			createdAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				formId: unknown;
				data?: unknown;
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		slug?: string;
		isActive?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			name: unknown;
			slug: unknown;
			description?: unknown;
			fields?: unknown;
			content?: unknown;
			settings?: unknown;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			slug,
			isActive,
			createdAt,
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				name: unknown;
				slug: unknown;
				description?: unknown;
				fields?: unknown;
				content?: unknown;
				settings?: unknown;
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
	 * Get a unique LLM-generated message, proving the AI pipeline is live
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
	 * Approve a pending idea to start content generation; a draft may follow automatically
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/approve
	 */
	approveIdea = async ({
		organizationId,
		projectId,
		ideaId,
		data,
	}: {
		organizationId: string;
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
		briefId?: string;
		mindRunId?: string;
		dismissedReason?: string;
		dismissedBy?: string;
		metadata?: unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/approve`;
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
			briefId?: string;
			mindRunId?: string;
			dismissedReason?: string;
			dismissedBy?: string;
			metadata?: unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Dismiss a pending idea with an optional reason so Mind stops suggesting it
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/dismiss
	 */
	dismissIdea = async ({
		organizationId,
		projectId,
		ideaId,
		data,
	}: {
		organizationId: string;
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
		briefId?: string;
		mindRunId?: string;
		dismissedReason?: string;
		dismissedBy?: string;
		metadata?: unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}/dismiss`;
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
			briefId?: string;
			mindRunId?: string;
			dismissedReason?: string;
			dismissedBy?: string;
			metadata?: unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one idea's rationale, outline and similarity score before approving or dismissing
	 * @method GET /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}
	 */
	getIdea = async ({
		organizationId,
		projectId,
		ideaId,
	}: {
		organizationId: string;
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
		briefId?: string;
		mindRunId?: string;
		dismissedReason?: string;
		dismissedBy?: string;
		metadata?: unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas/${encodeURIComponent(String(ideaId))}`;
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
			briefId?: string;
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		priority?: string;
		appId?: string;
		contentType?: string;
		targetContentType?: string;
		operationKey?: string;
		createdAt?: string;
		updatedAt?: string;
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
			briefId?: unknown;
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
			updatedAt,
		});
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
				briefId?: unknown;
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
	 * @method POST /organizations/{organizationId}/projects/{projectId}/mind/ideas
	 */
	triggerIdeation = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			target?: {
				contentType: string;
				operationKey: string;
			};
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/mind/ideas`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Invitations API methods
 */
class InvitationsResource extends BaseResource {
	/**
	 * Get an invitation by ID
	 * @method GET /organizations/{organizationId}/invitations/{invitationId}
	 */
	getOrganizationInvitation = async ({
		organizationId,
		invitationId,
	}: {
		organizationId: string;
		invitationId: string;
	}): Promise<{
		id: string;
		organizationId: string;
		email: string;
		role: "owner" | "admin" | "editor" | "viewer";
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/invitations/${encodeURIComponent(String(invitationId))}`;
		return this.request<{
			id: string;
			organizationId: string;
			email: string;
			role: "owner" | "admin" | "editor" | "viewer";
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
		email,
	}: {
		organizationId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		role?: string;
		email?: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/invitations`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			role,
			email,
		});
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * KB API methods
 */
class KBResource extends BaseResource {
	/**
	 * Get one article including its full content tree, status, SEO and category ids
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
		content?: Array<Record<string, unknown>>;
		excerpt?: unknown;
		status: "draft" | "published";
		isPublic: boolean;
		order: number;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		tags?: Array<string>;
		featuredImageUrl?: string | unknown;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
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
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status: "draft" | "published";
			isPublic: boolean;
			order: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			tags?: Array<string>;
			featuredImageUrl?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
			publishedAt?: string | unknown;
			categoryIds?: Array<string>;
			url?: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete KB article
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}
	 */
	deleteKbArticle = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles/${encodeURIComponent(String(articleId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		articleId: string;
		data: {
			name?: string;
			title?: string | Record<string, unknown> | unknown;
			slug?: string;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			excerpt?: string | Record<string, unknown> | unknown;
			tags?: Array<string>;
			featuredImageUrl?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		id: string;
		appId: string;
		name: string;
		title?: unknown;
		slug: string;
		content?: Array<Record<string, unknown>>;
		excerpt?: unknown;
		status: "draft" | "published";
		isPublic: boolean;
		order: number;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		tags?: Array<string>;
		featuredImageUrl?: string | unknown;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
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
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status: "draft" | "published";
			isPublic: boolean;
			order: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			tags?: Array<string>;
			featuredImageUrl?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
			publishedAt?: string | unknown;
			categoryIds?: Array<string>;
			url?: string;
		}>(endpoint, { method: "PATCH", data });
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
		publishedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		slug?: string;
		status?: string;
		isPublic?: string;
		categoryId?: string;
		createdAt?: string;
		updatedAt?: string;
		publishedAt?: string;
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
			isPublic: unknown;
			order: unknown;
			seo?: unknown;
			tags?: unknown;
			featuredImageUrl?: unknown;
			websiteAppId?: unknown;
			layoutId?: unknown;
			headerId?: unknown;
			footerId?: unknown;
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
			publishedAt,
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
				isPublic: unknown;
				order: unknown;
				seo?: unknown;
				tags?: unknown;
				featuredImageUrl?: unknown;
				websiteAppId?: unknown;
				layoutId?: unknown;
				headerId?: unknown;
				footerId?: unknown;
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
	 * Create an article shell; publishing with content also ingests it for AI chat
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles
	 */
	createKbArticle = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			title?: unknown;
			slug: string;
			content?: Array<Record<string, unknown>>;
			excerpt?: unknown;
			status?: "draft" | "published";
			isPublic?: boolean;
			order?: number;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			tags?: Array<string>;
			featuredImageUrl?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			categoryIds?: Array<string>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/articles`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one category's name, slug, description, parent and order; not its articles
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
	 * Delete KB category
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}
	 */
	deleteKbCategory = async ({
		organizationId,
		projectId,
		appId,
		categoryId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		categoryId: string;
		data: {
			name?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
		};
	}): Promise<Record<string, unknown>> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories/${encodeURIComponent(String(categoryId))}`;
		return this.request<Record<string, unknown>>(endpoint, {
			method: "PATCH",
			data,
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
		icon,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		slug?: string;
		icon?: string;
	}): Promise<{
		data: Array<Record<string, unknown>>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			slug,
			icon,
		});
		return this.request<{
			data: Array<Record<string, unknown>>;
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Create a category, optionally nested under a parent; order assigned automatically
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories
	 */
	createKbCategory = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: unknown;
			slug: string;
			description?: unknown;
			parentId?: string | unknown;
			order?: number;
			icon?: string | unknown;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/categories`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Update knowledge base landing page metadata
	 * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/landing
	 */
	updateKbLandingMeta = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
			};
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		content?: Array<Record<string, unknown>>;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
		};
		isPublic?: boolean;
		draftId?: string | unknown;
		websiteAppId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/landing`;
		return this.request<{
			content?: Array<Record<string, unknown>>;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
			};
			isPublic?: boolean;
			draftId?: string | unknown;
			websiteAppId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		}>(endpoint, { method: "PATCH", data });
	};

	/**
	 * Get one URL redirect by id
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/redirects/{redirectId}
	 */
	getKbRedirect = async ({
		organizationId,
		projectId,
		appId,
		redirectId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		redirectId: string;
	}): Promise<{
		id: string;
		appId: string;
		fromPath: string;
		toPath: string;
		status: number;
		source: "auto" | "manual";
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/kb/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
		return this.request<{
			id: string;
			appId: string;
			fromPath: string;
			toPath: string;
			status: number;
			source: "auto" | "manual";
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		source?: string;
		status?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			fromPath: unknown;
			toPath: unknown;
			status: unknown;
			source: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				fromPath: unknown;
				toPath: unknown;
				status: unknown;
				source: unknown;
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
 * Me API methods
 */
class MeResource extends BaseResource {
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
		createdAt,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		authorType?: string;
		authorId?: string;
		createdAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			userId: unknown;
			authorType: unknown;
			authorId?: unknown;
			authorName?: unknown;
			message: unknown;
			createdAt: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/me/suspension-messages`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			authorType,
			authorId,
			createdAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				userId: unknown;
				authorType: unknown;
				authorId?: unknown;
				authorName?: unknown;
				message: unknown;
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
		type,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		type?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			status,
			type,
		});
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
		updatedAt,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		slug?: string;
		plan?: string;
		subscriptionStatus?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<Record<string, unknown>>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			updatedAt,
		});
		return this.request<{
			data: Array<Record<string, unknown>>;
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
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
		role,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		role?: string;
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
		const endpoint = `/me/invitations`;
		const params = this.cleanParams({ page, pageSize, lite, sort, role });
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
		}>(endpoint, { method: "GET", params });
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
		resourceType,
	}: {
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		action?: string;
		resourceType?: string;
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
		const endpoint = `/me/activities`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			action,
			resourceType,
		});
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
		isPlatformAdmin: boolean;
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
			isPlatformAdmin: boolean;
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
		joinedAt,
	}: {
		organizationId: string;
		memberId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		role?: string;
		joinedAt?: string;
	}): Promise<{
		data: Array<{
			projectId: unknown;
			projectName: unknown;
			projectSlug: unknown;
			membershipId: unknown;
			role: unknown;
			joinedAt: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/project-memberships`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			role,
			joinedAt,
		});
		return this.request<{
			data: Array<{
				projectId: unknown;
				projectName: unknown;
				projectSlug: unknown;
				membershipId: unknown;
				role: unknown;
				joinedAt: unknown;
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
		projectId,
	}: {
		organizationId: string;
		memberId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		appType?: string;
		role?: string;
		projectId?: string;
	}): Promise<{
		data: Array<{
			appId: unknown;
			appName: unknown;
			appType: unknown;
			projectId: unknown;
			projectName: unknown;
			membershipId: unknown;
			role: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/app-memberships`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			appType,
			role,
			projectId,
		});
		return this.request<{
			data: Array<{
				appId: unknown;
				appName: unknown;
				appType: unknown;
				projectId: unknown;
				projectName: unknown;
				membershipId: unknown;
				role: unknown;
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
		resourceType,
	}: {
		organizationId: string;
		memberId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		action?: string;
		resourceType?: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}/activities`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			action,
			resourceType,
		});
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
	 * Get one member's profile, role, title and join date by member UUID
	 * @method GET /organizations/{organizationId}/members/{memberId}
	 */
	getOrganizationMember = async ({
		organizationId,
		memberId,
	}: {
		organizationId: string;
		memberId: string;
	}): Promise<{
		id: string;
		userId: string;
		organizationId: string;
		role: "owner" | "admin" | "editor" | "viewer";
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/members/${encodeURIComponent(String(memberId))}`;
		return this.request<{
			id: string;
			userId: string;
			organizationId: string;
			role: "owner" | "admin" | "editor" | "viewer";
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
		invitedAt,
	}: {
		organizationId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		role?: string;
		title?: string;
		userId?: string;
		invitedBy?: string;
		joinedAt?: string;
		invitedAt?: string;
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
			invitedAt,
		});
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
	 * @method GET /organizations/{organizationId}/service-accounts/{accountId}
	 */
	getServiceAccount = async ({
		organizationId,
		accountId,
	}: {
		organizationId: string;
		accountId: string;
	}): Promise<{
		id: string;
		name: string;
		email: string;
		description: string | unknown;
		organizationId: string;
		memberId: string;
		role: "admin" | "editor" | "viewer";
		createdAt: string;
		createdBy: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/service-accounts/${encodeURIComponent(String(accountId))}`;
		return this.request<{
			id: string;
			name: string;
			email: string;
			description: string | unknown;
			organizationId: string;
			memberId: string;
			role: "admin" | "editor" | "viewer";
			createdAt: string;
			createdBy: string | unknown;
		}>(endpoint, { method: "GET" });
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
		createdAt,
	}: {
		organizationId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		email?: string;
		createdAt?: string;
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
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/service-accounts`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			email,
			createdAt,
		});
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
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get one organization's name, slug, plan, status and member count by ID
	 * @method GET /organizations/{organizationId}
	 */
	getOrganization = async ({
		organizationId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}`;
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
	 * Get an organization from a URL slug when you have no ID
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
}

/**
 * Project Apps API methods
 */
class ProjectAppsResource extends BaseResource {
	/**
	 * Get a project app by slug
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/by-slug/{appSlug}
	 */
	getProjectAppBySlug = async ({
		organizationId,
		projectId,
		appSlug,
	}: {
		organizationId: string;
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
		settings?: Record<string, unknown>;
		primaryDomain: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/by-slug/${encodeURIComponent(String(appSlug))}`;
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
			settings?: Record<string, unknown>;
			primaryDomain: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Read one app's settings, whatever kind of app it is
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings
	 */
	getAppSettings = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
	}): Promise<{
		appId: string;
		appType: string;
		summary: string;
		schema: Record<string, unknown>;
		settings: Record<string, unknown>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/settings`;
		return this.request<{
			appId: string;
			appType: string;
			summary: string;
			schema: Record<string, unknown>;
			settings: Record<string, unknown>;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Change one app's settings, merging into what is already there
	 * @method PATCH /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings
	 */
	updateAppSettings = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			settings: Record<string, unknown>;
		};
	}): Promise<{
		appId: string;
		appType: string;
		summary: string;
		schema: Record<string, unknown>;
		settings: Record<string, unknown>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}/settings`;
		return this.request<{
			appId: string;
			appType: string;
			summary: string;
			schema: Record<string, unknown>;
			settings: Record<string, unknown>;
		}>(endpoint, { method: "PATCH", data });
	};

	/**
	 * Get a project app by ID
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}
	 */
	getProjectApp = async ({
		organizationId,
		projectId,
		appId,
	}: {
		organizationId: string;
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
		settings?: Record<string, unknown>;
		primaryDomain: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/${encodeURIComponent(String(appId))}`;
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
			settings?: Record<string, unknown>;
			primaryDomain: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		isActive,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		slug?: string;
		appType?: string;
		isActive?: string;
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
			settings?: unknown;
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
			isActive,
		});
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
				settings?: unknown;
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
		}>(endpoint, { method: "GET", params });
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
		isActive,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		slug?: string;
		appType?: string;
		isActive?: string;
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
			settings?: unknown;
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
			isActive,
		});
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
				settings?: unknown;
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
		}>(endpoint, { method: "GET", params });
	};
}

/**
 * Project Branding API methods
 */
class ProjectBrandingResource extends BaseResource {
	/**
	 * Get one branding profile's colors, fonts, logos and favicon
	 * @method GET /organizations/{organizationId}/projects/{projectId}/brandings/{brandingId}
	 */
	getProjectBranding = async ({
		organizationId,
		projectId,
		brandingId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/brandings/${encodeURIComponent(String(brandingId))}`;
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdBy?: string;
		createdAt?: string;
		updatedAt?: string;
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
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			updatedAt,
		});
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
 * Project Domains API methods
 */
class ProjectDomainsResource extends BaseResource {
	/**
	 * Get the exact DNS record the owner must add to verify a domain
	 * @method GET /organizations/{organizationId}/projects/{projectId}/domains/{domainId}/verification
	 */
	getDomainVerificationInstructions = async ({
		organizationId,
		projectId,
		domainId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/domains/${encodeURIComponent(String(domainId))}/verification`;
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
		verificationStatus,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		appId?: string;
		appType?: string;
		hostname?: string;
		isGenerated?: string;
		isPrimary?: string;
		isVerified?: string;
		verificationStatus?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			projectId: unknown;
			appId: unknown;
			appType: unknown;
			appName: unknown;
			appSlug: unknown;
			hostname: unknown;
			isGenerated: unknown;
			isPrimary: unknown;
			isVerified: unknown;
			verificationStatus: unknown;
			verificationError: unknown;
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
			verificationStatus,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				projectId: unknown;
				appId: unknown;
				appType: unknown;
				appName: unknown;
				appSlug: unknown;
				hostname: unknown;
				isGenerated: unknown;
				isPrimary: unknown;
				isVerified: unknown;
				verificationStatus: unknown;
				verificationError: unknown;
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
 * Project Files API methods
 */
class ProjectFilesResource extends BaseResource {
	/**
	 * Restore an item from trash
	 * @method POST /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}/restore
	 */
	restoreFileTrashItem = async ({
		organizationId,
		projectId,
		itemId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		itemId: string;
		data: {
			type: "file" | "folder";
			restoreContents?: boolean;
		};
	}): Promise<{
		success: boolean;
		restoredFiles?: number;
		restoredFolders?: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/${encodeURIComponent(String(itemId))}/restore`;
		return this.request<{
			success: boolean;
			restoredFiles?: number;
			restoredFolders?: number;
		}>(endpoint, { method: "POST", data });
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
		id,
	}: {
		organizationId: string;
		projectId: string;
		fileId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		type?: string;
		id?: string;
	}): Promise<{
		data: Array<{
			type: unknown;
			id: unknown;
			name: unknown;
			projectId: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/references`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			type,
			id,
		});
		return this.request<{
			data: Array<{
				type: unknown;
				id: unknown;
				name: unknown;
				projectId: unknown;
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
	 * Get one folder's name and parent; use listFiles with folderId to see its files
	 * @method GET /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}
	 */
	getFileFolder = async ({
		organizationId,
		projectId,
		folderId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
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
	 * Delete a file folder (files are moved to root)
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}
	 */
	deleteFileFolder = async ({
		organizationId,
		projectId,
		folderId,
	}: {
		organizationId: string;
		projectId: string;
		folderId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/folders/${encodeURIComponent(String(folderId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
	};

	/**
	 * Replace a text file's content in place; id, URL and references stay unchanged
	 * @method PUT /organizations/{organizationId}/projects/{projectId}/files/{fileId}/content
	 */
	replaceFileContent = async ({
		organizationId,
		projectId,
		fileId,
		data,
	}: {
		organizationId: string;
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
		grounding: "fact" | "context";
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/content`;
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
			grounding: "fact" | "context";
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
	 * Permanently delete an item from trash
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}
	 */
	permanentDeleteFileTrashItem = async ({
		organizationId,
		projectId,
		itemId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		itemId: string;
		data: {
			type: "file" | "folder";
		};
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/${encodeURIComponent(String(itemId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE", data });
	};

	/**
	 * Open a file's content inline: text as string, images as base64, 10 MB cap
	 * @method GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}/open
	 */
	openFile = async ({
		organizationId,
		projectId,
		fileId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}/open`;
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
	 * Empty trash (permanently delete old items)
	 * @method POST /organizations/{organizationId}/projects/{projectId}/files/trash/empty
	 */
	emptyFileTrash = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			olderThanDays?: number;
		};
	}): Promise<{
		success: boolean;
		deletedFiles: number;
		deletedFolders: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/trash/empty`;
		return this.request<{
			success: boolean;
			deletedFiles: number;
			deletedFolders: number;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one file's metadata only (URL, type, size, folder); openFile returns the content
	 * @method GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}
	 */
	getFile = async ({
		organizationId,
		projectId,
		fileId,
	}: {
		organizationId: string;
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
		grounding: "fact" | "context";
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
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
			grounding: "fact" | "context";
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
	 * Delete a file
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/files/{fileId}
	 */
	deleteFile = async ({
		organizationId,
		projectId,
		fileId,
	}: {
		organizationId: string;
		projectId: string;
		fileId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/${encodeURIComponent(String(fileId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		parentId?: string;
		name?: string;
		createdBy?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			projectId: unknown;
			name: unknown;
			slug: unknown;
			parentId: unknown;
			path?: unknown;
			childCount?: unknown;
			fileCount?: unknown;
			createdAt: unknown;
			updatedAt: unknown;
			createdBy: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				projectId: unknown;
				name: unknown;
				slug: unknown;
				parentId: unknown;
				path?: unknown;
				childCount?: unknown;
				fileCount?: unknown;
				createdAt: unknown;
				updatedAt: unknown;
				createdBy: unknown;
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
		limit,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		mimeType?: string;
		similarity?: string;
		filename?: string;
		query: string;
		limit?: string;
	}): Promise<{
		data: Array<{
			fileId: unknown;
			filename: unknown;
			originalFilename: unknown;
			mimeType: unknown;
			url: unknown;
			similarity: unknown;
			matchingContent: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			limit,
		});
		return this.request<{
			data: Array<{
				fileId: unknown;
				filename: unknown;
				originalFilename: unknown;
				mimeType: unknown;
				url: unknown;
				similarity: unknown;
				matchingContent: unknown;
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
		deletedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		type?: string;
		mimeType?: string;
		parentId?: string;
		deletedBy?: string;
		deletedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			type: unknown;
			name: unknown;
			deletedAt: unknown;
			deletedBy: unknown;
			parentId: unknown;
			mimeType?: unknown;
			sizeBytes?: unknown;
			url?: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			deletedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				type: unknown;
				name: unknown;
				deletedAt: unknown;
				deletedBy: unknown;
				parentId: unknown;
				mimeType?: unknown;
				sizeBytes?: unknown;
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
	 * Save a file from text or image content
	 * @method POST /organizations/{organizationId}/projects/{projectId}/files/save
	 */
	saveFile = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
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
			grounding?: "fact" | "context";
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
		grounding: "fact" | "context";
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/files/save`;
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
			grounding: "fact" | "context";
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
		folderId,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		isPublic?: string;
		grounding?: string;
		mimeType?: string;
		folderId?: string;
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
			folderId,
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
	 * Publish a draft project legal document
	 * @method POST /organizations/{organizationId}/projects/{projectId}/legal/{documentId}/publish
	 */
	publishProjectLegalDocument = async ({
		organizationId,
		projectId,
		documentId,
	}: {
		organizationId: string;
		projectId: string;
		documentId: string;
	}): Promise<{
		id: string;
		projectId: string;
		type: "tos" | "privacy" | "aup" | "cookie" | "custom";
		version: number;
		content?: Record<string, unknown>;
		status: "draft" | "published";
		publishedAt?: string;
		publishedBy?: string;
		createdBy: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}/publish`;
		return this.request<{
			id: string;
			projectId: string;
			type: "tos" | "privacy" | "aup" | "cookie" | "custom";
			version: number;
			content?: Record<string, unknown>;
			status: "draft" | "published";
			publishedAt?: string;
			publishedBy?: string;
			createdBy: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Get a project legal document by ID
	 * @method GET /organizations/{organizationId}/projects/{projectId}/legal/{documentId}
	 */
	getProjectLegalDocument = async ({
		organizationId,
		projectId,
		documentId,
	}: {
		organizationId: string;
		projectId: string;
		documentId: string;
	}): Promise<{
		id: string;
		projectId: string;
		type: "tos" | "privacy" | "aup" | "cookie" | "custom";
		version: number;
		content?: Record<string, unknown>;
		status: "draft" | "published";
		publishedAt?: string;
		publishedBy?: string;
		createdBy: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
		return this.request<{
			id: string;
			projectId: string;
			type: "tos" | "privacy" | "aup" | "cookie" | "custom";
			version: number;
			content?: Record<string, unknown>;
			status: "draft" | "published";
			publishedAt?: string;
			publishedBy?: string;
			createdBy: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Update a draft project legal document
	 * @method PATCH /organizations/{organizationId}/projects/{projectId}/legal/{documentId}
	 */
	updateProjectLegalDocument = async ({
		organizationId,
		projectId,
		documentId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		documentId: string;
		data: {
			content?: Record<string, unknown>;
		};
	}): Promise<{
		id: string;
		projectId: string;
		type: "tos" | "privacy" | "aup" | "cookie" | "custom";
		version: number;
		content?: Record<string, unknown>;
		status: "draft" | "published";
		publishedAt?: string;
		publishedBy?: string;
		createdBy: string;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal/${encodeURIComponent(String(documentId))}`;
		return this.request<{
			id: string;
			projectId: string;
			type: "tos" | "privacy" | "aup" | "cookie" | "custom";
			version: number;
			content?: Record<string, unknown>;
			status: "draft" | "published";
			publishedAt?: string;
			publishedBy?: string;
			createdBy: string;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "PATCH", data });
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
		status,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		type?: string;
		status?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			projectId: unknown;
			type: unknown;
			version: unknown;
			content?: unknown;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			type,
			status,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				projectId: unknown;
				type: unknown;
				version: unknown;
				content?: unknown;
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
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Create a new draft project legal document
	 * @method POST /organizations/{organizationId}/projects/{projectId}/legal
	 */
	createProjectLegalDocument = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			type: "tos" | "privacy" | "aup" | "cookie" | "custom";
			content?: Record<string, unknown>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/legal`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Project Members API methods
 */
class ProjectMembersResource extends BaseResource {
	/**
	 * Get a project member by ID
	 * @method GET /organizations/{organizationId}/projects/{projectId}/members/{memberId}
	 */
	getProjectMember = async ({
		organizationId,
		projectId,
		memberId,
	}: {
		organizationId: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/members/${encodeURIComponent(String(memberId))}`;
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
		joinedAt,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		role?: string;
		title?: string;
		userId?: string;
		joinedAt?: string;
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
			joinedAt,
		});
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
	 * Restore a trash batch
	 * @method POST /organizations/{organizationId}/projects/{projectId}/trash/batches/{batchId}/restore
	 */
	restoreProjectTrashBatch = async ({
		organizationId,
		projectId,
		batchId,
	}: {
		organizationId: string;
		projectId: string;
		batchId: string;
	}): Promise<{
		success: boolean;
		restoredCount: number;
		restored: Array<{
			trashId: unknown;
			entityType: unknown;
			entityId: unknown;
			appId: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/batches/${encodeURIComponent(String(batchId))}/restore`;
		return this.request<{
			success: boolean;
			restoredCount: number;
			restored: Array<{
				trashId: unknown;
				entityType: unknown;
				entityId: unknown;
				appId: unknown;
			}>;
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Restore an item from trash
	 * @method POST /organizations/{organizationId}/projects/{projectId}/trash/{trashId}/restore
	 */
	restoreProjectTrashItem = async ({
		organizationId,
		projectId,
		trashId,
	}: {
		organizationId: string;
		projectId: string;
		trashId: string;
	}): Promise<{
		success: boolean;
		entityType: string;
		entityId: string;
		appId: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}/restore`;
		return this.request<{
			success: boolean;
			entityType: string;
			entityId: string;
			appId: string | unknown;
		}>(endpoint, { method: "POST" });
	};

	/**
	 * Get one trashed item's entity type, deletion metadata and stored data snapshot
	 * @method GET /organizations/{organizationId}/projects/{projectId}/trash/{trashId}
	 */
	getProjectTrashItem = async ({
		organizationId,
		projectId,
		trashId,
	}: {
		organizationId: string;
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
		expiresAt: string | unknown;
		trashBatchId: string | unknown;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
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
			expiresAt: string | unknown;
			trashBatchId: string | unknown;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Permanently delete an item from trash
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/trash/{trashId}
	 */
	permanentDeleteProjectTrashItem = async ({
		organizationId,
		projectId,
		trashId,
	}: {
		organizationId: string;
		projectId: string;
		trashId: string;
	}): Promise<{
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash/${encodeURIComponent(String(trashId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		entityType,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		entityType?: string;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			entityType,
		});
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

	/**
	 * Empty all items from trash
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/trash
	 */
	emptyProjectTrash = async ({
		organizationId,
		projectId,
	}: {
		organizationId: string;
		projectId: string;
	}): Promise<{
		deletedCount: number;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/trash`;
		return this.request<{
			deletedCount: number;
		}>(endpoint, { method: "DELETE" });
	};
}

/**
 * Project Workflows API methods
 */
class ProjectWorkflowsResource extends BaseResource {
	/**
	 * Get a workflow run and its tasks
	 * @method GET /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}
	 */
	getWorkflowRun = async ({
		organizationId,
		projectId,
		runId,
	}: {
		organizationId: string;
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
				input?: unknown;
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
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
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
					input?: unknown;
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
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}
	 */
	dismissWorkflowRun = async ({
		organizationId,
		projectId,
		runId,
	}: {
		organizationId: string;
		projectId: string;
		runId: string;
	}): Promise<{
		success: boolean;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs/${encodeURIComponent(String(runId))}`;
		return this.request<{
			success: boolean;
		}>(endpoint, { method: "DELETE" });
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
		includeDismissed,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		type?: string;
		createdAt?: string;
		startedAt?: string;
		completedAt?: string;
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
			input?: unknown;
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
				input?: unknown;
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
	 * @method POST /organizations/{organizationId}/projects/{projectId}/workflows/runs
	 */
	createWorkflowRun = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			type: string;
			title?: string;
			input?: Record<string, unknown>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/workflows/runs`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};
}

/**
 * Projects API methods
 */
class ProjectsResource extends BaseResource {
	/**
	 * Get one project from its URL slug, same object as the by-ID lookup
	 * @method GET /organizations/{organizationId}/projects/by-slug/{projectSlug}
	 */
	getProjectBySlug = async ({
		organizationId,
		projectSlug,
	}: {
		organizationId: string;
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
		aiEntityConfig?: Record<string, unknown>;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		apps?: Array<{
			id: unknown;
			appType: unknown;
			name: unknown;
			slug: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/by-slug/${encodeURIComponent(String(projectSlug))}`;
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
			aiEntityConfig?: Record<string, unknown>;
			isActive: boolean;
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
		sourceTypes,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		sourceType?: string;
		sourceId?: string;
		similarity?: string;
		query: string;
		limit?: string;
		sourceTypes?: string;
	}): Promise<{
		data: Array<{
			sourceType: unknown;
			sourceId: unknown;
			content: unknown;
			similarity: unknown;
			metadata?: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			sourceTypes,
		});
		return this.request<{
			data: Array<{
				sourceType: unknown;
				sourceId: unknown;
				content: unknown;
				similarity: unknown;
				metadata?: unknown;
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
		path,
	}: {
		organizationId: string;
		projectId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		app?: string;
		type?: string;
		id?: string;
		path?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			name: unknown;
			path: unknown;
			type: unknown;
			app: unknown;
			seo?: unknown;
		}>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
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
			path,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				name: unknown;
				path: unknown;
				type: unknown;
				app: unknown;
				seo?: unknown;
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
	 * Get one project's name, slug, description and settings within an organization
	 * @method GET /organizations/{organizationId}/projects/{projectId}
	 */
	getProject = async ({
		organizationId,
		projectId,
	}: {
		organizationId: string;
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
		aiEntityConfig?: Record<string, unknown>;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		apps?: Array<{
			id: unknown;
			appType: unknown;
			name: unknown;
			slug: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}`;
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
			aiEntityConfig?: Record<string, unknown>;
			isActive: boolean;
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
		updatedAt,
	}: {
		organizationId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		slug?: string;
		createdAt?: string;
		updatedAt?: string;
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
			aiEntityConfig?: unknown;
			isActive: unknown;
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
			updatedAt,
		});
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
				aiEntityConfig?: unknown;
				isActive: unknown;
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
	 * Ask the search engines to recrawl a page, post, article or doc now
	 * @method POST /organizations/{organizationId}/projects/{projectId}/content/search-index
	 */
	submitContentToSearchEngines = async ({
		organizationId,
		projectId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		data: {
			contentType: string;
			contentId: string;
		};
	}): Promise<{
		submitted: boolean;
		reason?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/content/search-index`;
		return this.request<{
			submitted: boolean;
			reason?: string;
		}>(endpoint, { method: "POST", data });
	};

	/**
	 * Get the cookie banner copy, category toggles and policy links
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
	 * Get one dialog with its full block tree, max width and close control
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
		content?: Array<Record<string, unknown>>;
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
			content?: Array<Record<string, unknown>>;
			maxWidth: unknown;
			includeClose: boolean;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete dialog
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}
	 */
	deleteWebsiteDialog = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs/${encodeURIComponent(String(dialogId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		maxWidth?: string;
		includeClose?: string;
		createdAt?: string;
		updatedAt?: string;
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
			updatedAt,
		});
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
	 * Create a popup dialog; nothing shows it until a button links dialog:{id}
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs
	 */
	createWebsiteDialog = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
			maxWidth?: unknown;
			includeClose?: boolean;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/dialogs`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one domain with its verification token, verified state and primary flag
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		isPrimary?: string;
		isVerified?: string;
		isGenerated?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			domain: unknown;
			isGenerated: unknown;
			isVerified: unknown;
			isPrimary: unknown;
			verificationToken?: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				domain: unknown;
				isGenerated: unknown;
				isVerified: unknown;
				isPrimary: unknown;
				verificationToken?: unknown;
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
	 * Get one footer with its full block tree, which lite listings omit
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete website footer
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}
	 */
	deleteWebsiteFooter = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers/${encodeURIComponent(String(footerId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdAt?: string;
		updatedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			createdAt,
			updatedAt,
		});
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
	 * Create a reusable footer shell; pages attach it by id, content optional
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers
	 */
	createWebsiteFooter = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/footers`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one header with its full block tree, which lite listings omit
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete website header
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}
	 */
	deleteWebsiteHeader = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers/${encodeURIComponent(String(headerId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdAt?: string;
		updatedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			createdAt,
			updatedAt,
		});
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
	 * Create a reusable header shell; pages attach it by id, content optional
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers
	 */
	createWebsiteHeader = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/headers`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get the one seeded page at the site root; no create call exists
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/landing
	 */
	getWebsiteLanding = async ({
		organizationId,
		projectId,
		appId,
		draftId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		draftId?: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<Record<string, unknown>>;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		isPublic: boolean;
		draftId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
		backgroundColor?: string | unknown;
		layoutName?: string | unknown;
		headerName?: string | unknown;
		footerName?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/landing`;
		const params = this.cleanParams({ draftId });
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			isPublic: boolean;
			draftId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			backgroundColor?: string | unknown;
			layoutName?: string | unknown;
			headerName?: string | unknown;
			footerName?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET", params });
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
		draftId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name?: string;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
		draftId?: string;
	}): Promise<{
		id: string;
		projectId: string;
		name: string;
		content?: Array<Record<string, unknown>>;
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		isPublic: boolean;
		draftId?: string | unknown;
		layoutId?: string | unknown;
		headerId?: string | unknown;
		footerId?: string | unknown;
		backgroundColor?: string | unknown;
		layoutName?: string | unknown;
		headerName?: string | unknown;
		footerName?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/landing`;
		const params = this.cleanParams({ draftId });
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			isPublic: boolean;
			draftId?: string | unknown;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			backgroundColor?: string | unknown;
			layoutName?: string | unknown;
			headerName?: string | unknown;
			footerName?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "PATCH", data, params });
	};

	/**
	 * Get one layout with its full block tree, which lite listings omit
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts/${encodeURIComponent(String(layoutId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete website layout
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}
	 */
	deleteWebsiteLayout = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts/${encodeURIComponent(String(layoutId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdAt?: string;
		updatedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			createdAt,
			updatedAt,
		});
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
	 * Create a layout shell; pages set layoutId to share its block tree
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts
	 */
	createWebsiteLayout = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			description?: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/layouts`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one page with its full block tree, SEO, status and layout ids
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
		title?: string | Record<string, unknown> | unknown;
		slug: string;
		path?: string;
		url?: string;
		content?: Array<Record<string, unknown>>;
		status: "draft" | "published" | "scheduled";
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		scheduledPublishAt?: string | unknown;
		isPublic?: boolean;
		isNotFound?: boolean;
		excerpt?: string | Record<string, unknown> | unknown;
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
			title?: string | Record<string, unknown> | unknown;
			slug: string;
			path?: string;
			url?: string;
			content?: Array<Record<string, unknown>>;
			status: "draft" | "published" | "scheduled";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			scheduledPublishAt?: string | unknown;
			isPublic?: boolean;
			isNotFound?: boolean;
			excerpt?: string | Record<string, unknown> | unknown;
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
	 * Delete website page
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}
	 */
	deleteWebsitePage = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages/${encodeURIComponent(String(pageId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		pageId: string;
		data: {
			name?: string;
			title?: string | Record<string, unknown> | unknown;
			slug?: string;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		id: string;
		projectId: string;
		type: "page" | "post";
		name: string;
		title?: string | Record<string, unknown> | unknown;
		slug: string;
		path?: string;
		url?: string;
		content?: Array<Record<string, unknown>>;
		status: "draft" | "published" | "scheduled";
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		scheduledPublishAt?: string | unknown;
		isPublic?: boolean;
		isNotFound?: boolean;
		excerpt?: string | Record<string, unknown> | unknown;
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
			title?: string | Record<string, unknown> | unknown;
			slug: string;
			path?: string;
			url?: string;
			content?: Array<Record<string, unknown>>;
			status: "draft" | "published" | "scheduled";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			scheduledPublishAt?: string | unknown;
			isPublic?: boolean;
			isNotFound?: boolean;
			excerpt?: string | Record<string, unknown> | unknown;
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
		}>(endpoint, { method: "PATCH", data });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		slug?: string;
		isPublic?: string;
		layoutId?: string;
		headerId?: string;
		footerId?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			projectId: unknown;
			type: unknown;
			name: unknown;
			title?: unknown;
			slug: unknown;
			path?: unknown;
			url?: unknown;
			content?: unknown;
			status: unknown;
			seo?: unknown;
			scheduledPublishAt?: unknown;
			isPublic?: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				projectId: unknown;
				type: unknown;
				name: unknown;
				title?: unknown;
				slug: unknown;
				path?: unknown;
				url?: unknown;
				content?: unknown;
				status: unknown;
				seo?: unknown;
				scheduledPublishAt?: unknown;
				isPublic?: unknown;
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
	 * Create a page shell; content optional and status defaults to published, live immediately
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages
	 */
	createWebsitePage = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			slug: string;
			content?: Array<Record<string, unknown>>;
			status?: "draft" | "published";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			featuredImageUrl?: string | unknown;
			tags?: Array<string>;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			title?: string | Record<string, unknown> | unknown;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/pages`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one blog post with its full content blocks, tags and SEO fields
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
		title?: string | Record<string, unknown> | unknown;
		slug: string;
		path?: string;
		url?: string;
		content?: Array<Record<string, unknown>>;
		status: "draft" | "published" | "scheduled";
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		scheduledPublishAt?: string | unknown;
		isPublic?: boolean;
		isNotFound?: boolean;
		excerpt?: string | Record<string, unknown> | unknown;
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
			title?: string | Record<string, unknown> | unknown;
			slug: string;
			path?: string;
			url?: string;
			content?: Array<Record<string, unknown>>;
			status: "draft" | "published" | "scheduled";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			scheduledPublishAt?: string | unknown;
			isPublic?: boolean;
			isNotFound?: boolean;
			excerpt?: string | Record<string, unknown> | unknown;
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
	 * Delete blog post
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}
	 */
	deleteWebsitePost = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts/${encodeURIComponent(String(postId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		postId: string;
		data: {
			name?: string;
			title?: string | Record<string, unknown> | unknown;
			slug?: string;
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			excerpt?: string | Record<string, unknown> | unknown;
			authorName?: string | unknown;
			featuredImageUrl?: string | unknown;
			publishDate?: string | unknown;
			tags?: Array<string>;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
		};
	}): Promise<{
		id: string;
		projectId: string;
		type: "page" | "post";
		name: string;
		title?: string | Record<string, unknown> | unknown;
		slug: string;
		path?: string;
		url?: string;
		status: "draft" | "published" | "scheduled";
		seo?: {
			title?: string | Record<string, unknown> | unknown;
			description?: string | Record<string, unknown> | unknown;
			image?: string | unknown;
			noindex?: boolean | unknown;
		};
		scheduledPublishAt?: string | unknown;
		isPublic?: boolean;
		isNotFound?: boolean;
		excerpt?: string | Record<string, unknown> | unknown;
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
			title?: string | Record<string, unknown> | unknown;
			slug: string;
			path?: string;
			url?: string;
			status: "draft" | "published" | "scheduled";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			scheduledPublishAt?: string | unknown;
			isPublic?: boolean;
			isNotFound?: boolean;
			excerpt?: string | Record<string, unknown> | unknown;
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
		}>(endpoint, { method: "PATCH", data });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		status?: string;
		slug?: string;
		isPublic?: string;
		authorId?: string;
		authorName?: string;
		publishDate?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			projectId: unknown;
			type: unknown;
			name: unknown;
			title?: unknown;
			slug: unknown;
			path?: unknown;
			url?: unknown;
			content?: unknown;
			status: unknown;
			seo?: unknown;
			scheduledPublishAt?: unknown;
			isPublic?: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				projectId: unknown;
				type: unknown;
				name: unknown;
				title?: unknown;
				slug: unknown;
				path?: unknown;
				url?: unknown;
				content?: unknown;
				status: unknown;
				seo?: unknown;
				scheduledPublishAt?: unknown;
				isPublic?: unknown;
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
	 * Create a blog post; status defaults to draft, unlike createWebsitePage
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts
	 */
	createWebsitePost = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			slug: string;
			content?: Array<Record<string, unknown>>;
			status?: "draft" | "published";
			seo?: {
				title?: string | Record<string, unknown> | unknown;
				description?: string | Record<string, unknown> | unknown;
				image?: string | unknown;
				noindex?: boolean | unknown;
			};
			excerpt?: string | Record<string, unknown> | unknown;
			authorName?: string | unknown;
			featuredImageUrl?: string | unknown;
			publishDate?: string | unknown;
			tags?: Array<string>;
			layoutId?: string | unknown;
			headerId?: string | unknown;
			footerId?: string | unknown;
			scheduledPublishAt?: string | unknown;
			title?: string | Record<string, unknown> | unknown;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/posts`;
		return this.request<unknown>(endpoint, { method: "POST", data });
	};

	/**
	 * Get one URL redirect by id
	 * @method GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/redirects/{redirectId}
	 */
	getWebsiteRedirect = async ({
		organizationId,
		projectId,
		appId,
		redirectId,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		redirectId: string;
	}): Promise<{
		id: string;
		appId: string;
		fromPath: string;
		toPath: string;
		status: number;
		source: "auto" | "manual";
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/redirects/${encodeURIComponent(String(redirectId))}`;
		return this.request<{
			id: string;
			appId: string;
			fromPath: string;
			toPath: string;
			status: number;
			source: "auto" | "manual";
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		source?: string;
		status?: string;
		createdAt?: string;
		updatedAt?: string;
	}): Promise<{
		data: Array<{
			id: unknown;
			appId: unknown;
			fromPath: unknown;
			toPath: unknown;
			status: unknown;
			source: unknown;
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
			updatedAt,
		});
		return this.request<{
			data: Array<{
				id: unknown;
				appId: unknown;
				fromPath: unknown;
				toPath: unknown;
				status: unknown;
				source: unknown;
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
	 * Get one sidebar with its full block tree, which lite listings omit
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
		content?: Array<Record<string, unknown>>;
		draftId?: string | unknown;
		createdAt: string;
		updatedAt: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars/${encodeURIComponent(String(sidebarId))}`;
		return this.request<{
			id: string;
			projectId: string;
			name: string;
			content?: Array<Record<string, unknown>>;
			draftId?: string | unknown;
			createdAt: string;
			updatedAt: string;
		}>(endpoint, { method: "GET" });
	};

	/**
	 * Delete website sidebar
	 * @method DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}
	 */
	deleteWebsiteSidebar = async ({
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
		success: boolean;
		message?: string;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars/${encodeURIComponent(String(sidebarId))}`;
		return this.request<{
			success: boolean;
			message?: string;
		}>(endpoint, { method: "DELETE" });
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
		updatedAt,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		name?: string;
		createdAt?: string;
		updatedAt?: string;
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
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			name,
			createdAt,
			updatedAt,
		});
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
	 * Create a reusable sidebar shell; a layoutSidebar block points at it by id
	 * @method POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars
	 */
	createWebsiteSidebar = async ({
		organizationId,
		projectId,
		appId,
		data,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		data: {
			name: string;
			content?: Array<Record<string, unknown>>;
		};
	}): Promise<unknown> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/sidebars`;
		return this.request<unknown>(endpoint, { method: "POST", data });
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
		tag,
	}: {
		organizationId: string;
		projectId: string;
		appId: string;
		page?: string;
		pageSize?: string;
		lite?: string;
		sort?: string;
		search?: string;
		tag?: string;
	}): Promise<{
		data: Array<string>;
		meta: {
			total: number;
			page: number;
			pageSize: number;
			pageCount: number;
		};
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/tags`;
		const params = this.cleanParams({
			page,
			pageSize,
			lite,
			sort,
			search,
			tag,
		});
		return this.request<{
			data: Array<string>;
			meta: {
				total: number;
				page: number;
				pageSize: number;
				pageCount: number;
			};
		}>(endpoint, { method: "GET", params });
	};

	/**
	 * Get the site's Google Tag Manager container ID, the only tracking setting
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
	 * Get existing page slugs and each page's layout, to avoid duplicate slugs
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
		entries: Array<{
			slug: unknown;
			name: unknown;
			layoutId: unknown;
		}>;
	}> => {
		const endpoint = `/organizations/${encodeURIComponent(String(organizationId))}/projects/${encodeURIComponent(String(projectId))}/apps/website/${encodeURIComponent(String(appId))}/urls`;
		return this.request<{
			slugs: Array<string>;
			entries: Array<{
				slug: unknown;
				name: unknown;
				layoutId: unknown;
			}>;
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
	briefs: BriefsResource;
	bugReports: BugReportsResource;
	builder: BuilderResource;
	crm: CRMResource;
	chat: ChatResource;
	contentVersions: ContentVersionsResource;
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
