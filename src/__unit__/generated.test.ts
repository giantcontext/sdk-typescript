/** @format */

// AUTO-GENERATED - DO NOT EDIT
// Run "pnpm generate:sdk" to regenerate from OpenAPI spec

import { describe, it, expect, beforeEach, vi } from "vitest";
import { createGiantContext } from "../index";

const baseUrl = "https://api.giantcontext.com";
const mockToken = "mock-jwt-token";

const mockFetch = vi.fn();

const tokenResponse = () =>
	new Response(
		JSON.stringify({
			token: mockToken,
			expiresAt: new Date(Date.now() + 3600000).toISOString(),
		}),
		{ status: 200, headers: { "Content-Type": "application/json" } },
	);

const okResponse = (body: unknown = {}) =>
	new Response(JSON.stringify(body), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});

const expectFetch = (method: string, url: string, body?: unknown) => {
	const call = mockFetch.mock.calls.find(
		([u, init]: [string, RequestInit]) => u === url && init.method === method,
	);
	expect(call).toBeTruthy();
	const [, init] = call!;
	expect(init.headers).toEqual(
		expect.objectContaining({ Authorization: `Bearer ${mockToken}` }),
	);
	if (body !== undefined) {
		expect(JSON.parse(init.body as string)).toEqual(body);
	}
};

describe("GiantContext SDK", () => {
	let gc: ReturnType<typeof createGiantContext>;

	beforeEach(() => {
		vi.stubGlobal("fetch", mockFetch);
		mockFetch.mockReset();
		mockFetch.mockResolvedValue(okResponse());
		// First call is always the token exchange
		mockFetch.mockResolvedValueOnce(tokenResponse());
		gc = createGiantContext({ apiKey: "gct_test_key" });
	});

	describe("API Keys", () => {
		it("listMyApiKeys → GET /me/api-keys", async () => {
			await gc.apiKeys.listMyApiKeys({});

			expectFetch("GET", `${baseUrl}/me/api-keys`);
		});

		it("listOrganizationApiKeys → GET /organizations/{organizationId}/api-keys", async () => {
			await gc.apiKeys.listOrganizationApiKeys({
				organizationId: "organizationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/api-keys`,
			);
		});
	});

	describe("App Members", () => {
		it("getAppMember → GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/members/{memberId}", async () => {
			await gc.appMembers.getAppMember({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/appId-test/members/memberId-test`,
			);
		});

		it("listAppMembers → GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/members", async () => {
			await gc.appMembers.listAppMembers({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/appId-test/members`,
			);
		});
	});

	describe("Briefs", () => {
		it("approveBrief → POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/approve", async () => {
			await gc.briefs.approveBrief({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				briefId: "briefId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/briefs/briefId-test/approve`,
			);
		});

		it("rejectBrief → POST /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}/reject", async () => {
			await gc.briefs.rejectBrief({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				briefId: "briefId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/briefs/briefId-test/reject`,
				{ test: true },
			);
		});

		it("getBrief → GET /organizations/{organizationId}/projects/{projectId}/mind/briefs/{briefId}", async () => {
			await gc.briefs.getBrief({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				briefId: "briefId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/briefs/briefId-test`,
			);
		});

		it("listBriefs → GET /organizations/{organizationId}/projects/{projectId}/mind/briefs", async () => {
			await gc.briefs.listBriefs({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/briefs`,
			);
		});
	});

	describe("Bug Reports", () => {
		it("listMyBugReports → GET /me/bug-reports", async () => {
			await gc.bugReports.listMyBugReports({});

			expectFetch("GET", `${baseUrl}/me/bug-reports`);
		});

		it("listBugReportComments → GET /me/bug-reports/{bugReportId}/comments", async () => {
			await gc.bugReports.listBugReportComments({
				bugReportId: "bugReportId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/me/bug-reports/bugReportId-test/comments`,
			);
		});
	});

	describe("Builder", () => {
		it("getContentTypes → GET /builder/content-types", async () => {
			await gc.builder.getContentTypes();

			expectFetch("GET", `${baseUrl}/builder/content-types`);
		});

		it("getBlockStyles → GET /builder/styles", async () => {
			await gc.builder.getBlockStyles();

			expectFetch("GET", `${baseUrl}/builder/styles`);
		});

		it("getBlock → GET /builder/blocks/{blockType}", async () => {
			await gc.builder.getBlock({
				blockType: "blockType-test",
				contentType: "contentType-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/builder/blocks/blockType-test?contentType=contentType-test`,
			);
		});

		it("deleteSection → POST /organizations/{organizationId}/projects/{projectId}/content/sections/delete", async () => {
			await gc.builder.deleteSection({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/sections/delete`,
				{ test: true },
			);
		});

		it("insertSection → POST /organizations/{organizationId}/projects/{projectId}/content/sections/insert", async () => {
			await gc.builder.insertSection({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/sections/insert`,
				{ test: true },
			);
		});

		it("updateSection → POST /organizations/{organizationId}/projects/{projectId}/content/sections/update", async () => {
			await gc.builder.updateSection({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/sections/update`,
				{ test: true },
			);
		});

		it("deleteBlock → POST /organizations/{organizationId}/projects/{projectId}/content/blocks/delete", async () => {
			await gc.builder.deleteBlock({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/blocks/delete`,
				{ test: true },
			);
		});

		it("insertBlock → POST /organizations/{organizationId}/projects/{projectId}/content/blocks/insert", async () => {
			await gc.builder.insertBlock({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/blocks/insert`,
				{ test: true },
			);
		});

		it("updateBlock → POST /organizations/{organizationId}/projects/{projectId}/content/blocks/update", async () => {
			await gc.builder.updateBlock({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/blocks/update`,
				{ test: true },
			);
		});

		it("moveSection → POST /organizations/{organizationId}/projects/{projectId}/content/sections/move", async () => {
			await gc.builder.moveSection({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/sections/move`,
				{ test: true },
			);
		});

		it("moveBlock → POST /organizations/{organizationId}/projects/{projectId}/content/blocks/move", async () => {
			await gc.builder.moveBlock({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/blocks/move`,
				{ test: true },
			);
		});

		it("unpublishContent → POST /organizations/{organizationId}/projects/{projectId}/content/unpublish", async () => {
			await gc.builder.unpublishContent({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/unpublish`,
				{ test: true },
			);
		});

		it("publishContent → POST /organizations/{organizationId}/projects/{projectId}/content/publish", async () => {
			await gc.builder.publishContent({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/publish`,
				{ test: true },
			);
		});

		it("searchContent → GET /organizations/{organizationId}/projects/{projectId}/content/search", async () => {
			await gc.builder.searchContent({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/search`,
			);
		});

		it("getContent → GET /organizations/{organizationId}/projects/{projectId}/content", async () => {
			await gc.builder.getContent({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				contentType: "contentType-test",
				contentId: "contentId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content?contentType=contentType-test&contentId=contentId-test`,
			);
		});
	});

	describe("CRM", () => {
		it("getCrmActivity → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities/{activityId}", async () => {
			await gc.crm.getCrmActivity({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				activityId: "activityId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/activities/activityId-test`,
			);
		});

		it("listCrmActivities → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities", async () => {
			await gc.crm.listCrmActivities({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/activities`,
			);
		});

		it("logCrmActivity → POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities", async () => {
			await gc.crm.logCrmActivity({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/activities`,
				{ test: true },
			);
		});

		it("listCrmCompanyActivities → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities", async () => {
			await gc.crm.listCrmCompanyActivities({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				companyId: "companyId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/companies/companyId-test/activities`,
			);
		});

		it("listCrmCompanyContacts → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts", async () => {
			await gc.crm.listCrmCompanyContacts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				companyId: "companyId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/companies/companyId-test/contacts`,
			);
		});

		it("getCrmCompany → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}", async () => {
			await gc.crm.getCrmCompany({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				companyId: "companyId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/companies/companyId-test`,
			);
		});

		it("listCrmCompanies → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies", async () => {
			await gc.crm.listCrmCompanies({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/companies`,
			);
		});

		it("listCrmContactActivities → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities", async () => {
			await gc.crm.listCrmContactActivities({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test/activities`,
			);
		});

		it("setCrmContactField → PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/fields", async () => {
			await gc.crm.setCrmContactField({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
				data: { test: true },
			});

			expectFetch(
				"PUT",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test/fields`,
				{ test: true },
			);
		});

		it("getCrmContact → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}", async () => {
			await gc.crm.getCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test`,
			);
		});

		it("updateCrmContact → PATCH /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}", async () => {
			await gc.crm.updateCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test`,
				{ test: true },
			);
		});

		it("tagCrmContact → POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags", async () => {
			await gc.crm.tagCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test/tags`,
				{ test: true },
			);
		});

		it("untagCrmContact → DELETE /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/tags", async () => {
			await gc.crm.untagCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
				data: { test: true },
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts/contactId-test/tags`,
				{ test: true },
			);
		});

		it("listCrmContacts → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts", async () => {
			await gc.crm.listCrmContacts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts`,
			);
		});

		it("createCrmContact → POST /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts", async () => {
			await gc.crm.createCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/contacts`,
				{ test: true },
			);
		});
	});

	describe("Chat", () => {
		it("getChatConversation → GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations/{conversationId}", async () => {
			await gc.chat.getChatConversation({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				conversationId: "conversationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/chat/appId-test/conversations/conversationId-test`,
			);
		});

		it("listChatConversations → GET /organizations/{organizationId}/projects/{projectId}/apps/chat/{appId}/conversations", async () => {
			await gc.chat.listChatConversations({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/chat/appId-test/conversations`,
			);
		});
	});

	describe("Content Versions", () => {
		it("restoreContentVersion → POST /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}/restore", async () => {
			await gc.contentVersions.restoreContentVersion({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				versionId: "versionId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content-versions/versionId-test/restore`,
			);
		});

		it("getContentVersion → GET /organizations/{organizationId}/projects/{projectId}/content-versions/{versionId}", async () => {
			await gc.contentVersions.getContentVersion({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				versionId: "versionId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content-versions/versionId-test`,
			);
		});

		it("listContentVersions → GET /organizations/{organizationId}/projects/{projectId}/content-versions", async () => {
			await gc.contentVersions.listContentVersions({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				contentType: "contentType-test",
				contentId: "contentId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content-versions?contentType=contentType-test&contentId=contentId-test`,
			);
		});
	});

	describe("Developers", () => {
		it("getDevelopersDocCategory → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}", async () => {
			await gc.developers.getDevelopersDocCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/categories/categoryId-test`,
			);
		});

		it("deleteDevelopersDocCategory → DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}", async () => {
			await gc.developers.deleteDevelopersDocCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/categories/categoryId-test`,
			);
		});

		it("updateDevelopersDocCategoryMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories/{categoryId}", async () => {
			await gc.developers.updateDevelopersDocCategoryMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/categories/categoryId-test`,
				{ test: true },
			);
		});

		it("listDevelopersDocCategories → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories", async () => {
			await gc.developers.listDevelopersDocCategories({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/categories`,
			);
		});

		it("createDevelopersDocCategory → POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/categories", async () => {
			await gc.developers.createDevelopersDocCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/categories`,
				{ test: true },
			);
		});

		it("getDevelopersDoc → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}", async () => {
			await gc.developers.getDevelopersDoc({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				docId: "docId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/docs/docId-test`,
			);
		});

		it("deleteDevelopersDoc → DELETE /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}", async () => {
			await gc.developers.deleteDevelopersDoc({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				docId: "docId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/docs/docId-test`,
			);
		});

		it("updateDevelopersDocMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs/{docId}", async () => {
			await gc.developers.updateDevelopersDocMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				docId: "docId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/docs/docId-test`,
				{ test: true },
			);
		});

		it("listDevelopersDocs → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs", async () => {
			await gc.developers.listDevelopersDocs({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/docs`,
			);
		});

		it("createDevelopersDoc → POST /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/docs", async () => {
			await gc.developers.createDevelopersDoc({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/docs`,
				{ test: true },
			);
		});

		it("updateDevelopersLandingMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/landing", async () => {
			await gc.developers.updateDevelopersLandingMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/landing`,
				{ test: true },
			);
		});

		it("getDevelopersRedirect → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/redirects/{redirectId}", async () => {
			await gc.developers.getDevelopersRedirect({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				redirectId: "redirectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/redirects/redirectId-test`,
			);
		});

		it("listDevelopersRedirects → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/redirects", async () => {
			await gc.developers.listDevelopersRedirects({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/redirects`,
			);
		});

		it("getDevelopersSyncLogs → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs", async () => {
			await gc.developers.getDevelopersSyncLogs({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/developers/appId-test/sync-logs`,
			);
		});
	});

	describe("Drafts", () => {
		it("unarchiveDraft → POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/unarchive", async () => {
			await gc.drafts.unarchiveDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/drafts/draftId-test/unarchive`,
			);
		});

		it("archiveDraft → POST /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}/archive", async () => {
			await gc.drafts.archiveDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/drafts/draftId-test/archive`,
			);
		});

		it("generateEditDraft → POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/edit", async () => {
			await gc.drafts.generateEditDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/drafts/generate/edit`,
				{ test: true },
			);
		});

		it("getDraft → GET /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}", async () => {
			await gc.drafts.getDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/drafts/draftId-test`,
			);
		});

		it("deleteDraft → DELETE /organizations/{organizationId}/projects/{projectId}/mind/drafts/{draftId}", async () => {
			await gc.drafts.deleteDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/drafts/draftId-test`,
			);
		});

		it("generateNewDraft → POST /organizations/{organizationId}/projects/{projectId}/drafts/generate/new", async () => {
			await gc.drafts.generateNewDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/drafts/generate/new`,
				{ test: true },
			);
		});

		it("createEditDraft → POST /organizations/{organizationId}/projects/{projectId}/drafts/edit", async () => {
			await gc.drafts.createEditDraft({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/drafts/edit`,
				{ test: true },
			);
		});

		it("listDrafts → GET /organizations/{organizationId}/projects/{projectId}/mind/drafts", async () => {
			await gc.drafts.listDrafts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/drafts`,
			);
		});
	});

	describe("Email", () => {
		it("sendTransactionalEmail → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/actions/send", async () => {
			await gc.email.sendTransactionalEmail({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/actions/send`,
				{ test: true },
			);
		});

		it("getContactEmailTimeline → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/contacts/{contactId}/timeline", async () => {
			await gc.email.getContactEmailTimeline({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/contacts/contactId-test/timeline`,
			);
		});

		it("getEmail → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}", async () => {
			await gc.email.getEmail({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test`,
			);
		});

		it("deleteEmail → DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}", async () => {
			await gc.email.deleteEmail({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test`,
			);
		});

		it("updateEmailMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}", async () => {
			await gc.email.updateEmailMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test`,
				{ test: true },
			);
		});

		it("getEmailRecipient → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}", async () => {
			await gc.email.getEmailRecipient({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
				recipientId: "recipientId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test/recipients/recipientId-test`,
			);
		});

		it("unsubscribeEmailRecipient → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients/{recipientId}/unsubscribe", async () => {
			await gc.email.unsubscribeEmailRecipient({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
				recipientId: "recipientId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test/recipients/recipientId-test/unsubscribe`,
				{ test: true },
			);
		});

		it("listEmailRecipients → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients", async () => {
			await gc.email.listEmailRecipients({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test/recipients`,
			);
		});

		it("subscribeEmailRecipient → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients", async () => {
			await gc.email.subscribeEmailRecipient({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				emailId: "emailId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails/emailId-test/recipients`,
				{ test: true },
			);
		});

		it("listEmails → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails", async () => {
			await gc.email.listEmails({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/emails`,
			);
		});

		it("getEmailFooter → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}", async () => {
			await gc.email.getEmailFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				footerId: "footerId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/footers/footerId-test`,
			);
		});

		it("deleteEmailFooter → DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers/{footerId}", async () => {
			await gc.email.deleteEmailFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				footerId: "footerId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/footers/footerId-test`,
			);
		});

		it("listEmailFooters → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers", async () => {
			await gc.email.listEmailFooters({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/footers`,
			);
		});

		it("createEmailFooter → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/footers", async () => {
			await gc.email.createEmailFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/footers`,
				{ test: true },
			);
		});

		it("getEmailHeader → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}", async () => {
			await gc.email.getEmailHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				headerId: "headerId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/headers/headerId-test`,
			);
		});

		it("deleteEmailHeader → DELETE /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers/{headerId}", async () => {
			await gc.email.deleteEmailHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				headerId: "headerId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/headers/headerId-test`,
			);
		});

		it("listEmailHeaders → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers", async () => {
			await gc.email.listEmailHeaders({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/headers`,
			);
		});

		it("createEmailHeader → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/headers", async () => {
			await gc.email.createEmailHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/headers`,
				{ test: true },
			);
		});

		it("getEmailSend → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}", async () => {
			await gc.email.getEmailSend({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				sendId: "sendId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/sends/sendId-test`,
			);
		});

		it("updateEmailSend → PATCH /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends/{sendId}", async () => {
			await gc.email.updateEmailSend({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				sendId: "sendId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/sends/sendId-test`,
				{ test: true },
			);
		});

		it("listEmailSends → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends", async () => {
			await gc.email.listEmailSends({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/sends`,
			);
		});

		it("createEmailSend → POST /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends", async () => {
			await gc.email.createEmailSend({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/email/appId-test/sends`,
				{ test: true },
			);
		});
	});

	describe("Feature Requests", () => {
		it("listPopularFeatureRequests → GET /me/feature-requests/popular", async () => {
			await gc.featureRequests.listPopularFeatureRequests({});

			expectFetch("GET", `${baseUrl}/me/feature-requests/popular`);
		});

		it("listMyFeatureRequests → GET /me/feature-requests", async () => {
			await gc.featureRequests.listMyFeatureRequests({});

			expectFetch("GET", `${baseUrl}/me/feature-requests`);
		});

		it("listFeatureRequestComments → GET /me/feature-requests/{featureRequestId}/comments", async () => {
			await gc.featureRequests.listFeatureRequestComments({
				featureRequestId: "featureRequestId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/me/feature-requests/featureRequestId-test/comments`,
			);
		});
	});

	describe("Forms", () => {
		it("getForm → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}", async () => {
			await gc.forms.getForm({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				formId: "formId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms/formId-test`,
			);
		});

		it("deleteForm → DELETE /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}", async () => {
			await gc.forms.deleteForm({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				formId: "formId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms/formId-test`,
			);
		});

		it("updateFormMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}", async () => {
			await gc.forms.updateFormMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				formId: "formId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms/formId-test`,
				{ test: true },
			);
		});

		it("getFormSubmission → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions/{submissionId}", async () => {
			await gc.forms.getFormSubmission({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				formId: "formId-test",
				submissionId: "submissionId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms/formId-test/submissions/submissionId-test`,
			);
		});

		it("listFormSubmissions → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions", async () => {
			await gc.forms.listFormSubmissions({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				formId: "formId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms/formId-test/submissions`,
			);
		});

		it("listForms → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms", async () => {
			await gc.forms.listForms({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/forms/appId-test/forms`,
			);
		});
	});

	describe("Health", () => {
		it("getHealthEcho → GET /health/echo", async () => {
			await gc.health.getHealthEcho();

			expectFetch("GET", `${baseUrl}/health/echo`);
		});
	});

	describe("Ideas", () => {
		it("approveIdea → POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/approve", async () => {
			await gc.ideas.approveIdea({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/ideas/ideaId-test/approve`,
				{ test: true },
			);
		});

		it("dismissIdea → POST /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}/dismiss", async () => {
			await gc.ideas.dismissIdea({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/ideas/ideaId-test/dismiss`,
				{ test: true },
			);
		});

		it("getIdea → GET /organizations/{organizationId}/projects/{projectId}/mind/ideas/{ideaId}", async () => {
			await gc.ideas.getIdea({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/ideas/ideaId-test`,
			);
		});

		it("listIdeas → GET /organizations/{organizationId}/projects/{projectId}/mind/ideas", async () => {
			await gc.ideas.listIdeas({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/ideas`,
			);
		});

		it("triggerIdeation → POST /organizations/{organizationId}/projects/{projectId}/mind/ideas", async () => {
			await gc.ideas.triggerIdeation({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/mind/ideas`,
				{ test: true },
			);
		});
	});

	describe("Invitations", () => {
		it("getOrganizationInvitation → GET /organizations/{organizationId}/invitations/{invitationId}", async () => {
			await gc.invitations.getOrganizationInvitation({
				organizationId: "organizationId-test",
				invitationId: "invitationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/invitations/invitationId-test`,
			);
		});

		it("listOrganizationInvitations → GET /organizations/{organizationId}/invitations", async () => {
			await gc.invitations.listOrganizationInvitations({
				organizationId: "organizationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/invitations`,
			);
		});
	});

	describe("KB", () => {
		it("getKbArticle → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}", async () => {
			await gc.kb.getKbArticle({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				articleId: "articleId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/articles/articleId-test`,
			);
		});

		it("deleteKbArticle → DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}", async () => {
			await gc.kb.deleteKbArticle({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				articleId: "articleId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/articles/articleId-test`,
			);
		});

		it("updateKbArticleMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles/{articleId}", async () => {
			await gc.kb.updateKbArticleMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				articleId: "articleId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/articles/articleId-test`,
				{ test: true },
			);
		});

		it("listKbArticles → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles", async () => {
			await gc.kb.listKbArticles({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/articles`,
			);
		});

		it("createKbArticle → POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/articles", async () => {
			await gc.kb.createKbArticle({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/articles`,
				{ test: true },
			);
		});

		it("getKbCategory → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}", async () => {
			await gc.kb.getKbCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/categories/categoryId-test`,
			);
		});

		it("deleteKbCategory → DELETE /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}", async () => {
			await gc.kb.deleteKbCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/categories/categoryId-test`,
			);
		});

		it("updateKbCategoryMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories/{categoryId}", async () => {
			await gc.kb.updateKbCategoryMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				categoryId: "categoryId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/categories/categoryId-test`,
				{ test: true },
			);
		});

		it("listKbCategories → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories", async () => {
			await gc.kb.listKbCategories({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/categories`,
			);
		});

		it("createKbCategory → POST /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/categories", async () => {
			await gc.kb.createKbCategory({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/categories`,
				{ test: true },
			);
		});

		it("updateKbLandingMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/landing", async () => {
			await gc.kb.updateKbLandingMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/landing`,
				{ test: true },
			);
		});

		it("getKbRedirect → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/redirects/{redirectId}", async () => {
			await gc.kb.getKbRedirect({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				redirectId: "redirectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/redirects/redirectId-test`,
			);
		});

		it("listKbRedirects → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/redirects", async () => {
			await gc.kb.listKbRedirects({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/redirects`,
			);
		});
	});

	describe("Me", () => {
		it("listMySuspensionMessages → GET /me/suspension-messages", async () => {
			await gc.me.listMySuspensionMessages({});

			expectFetch("GET", `${baseUrl}/me/suspension-messages`);
		});

		it("listMyNotifications → GET /me/notifications", async () => {
			await gc.me.listMyNotifications({});

			expectFetch("GET", `${baseUrl}/me/notifications`);
		});

		it("listMyOrganizations → GET /me/organizations", async () => {
			await gc.me.listMyOrganizations({});

			expectFetch("GET", `${baseUrl}/me/organizations`);
		});

		it("listMyInvitations → GET /me/invitations", async () => {
			await gc.me.listMyInvitations({});

			expectFetch("GET", `${baseUrl}/me/invitations`);
		});

		it("listMyActivities → GET /me/activities", async () => {
			await gc.me.listMyActivities({});

			expectFetch("GET", `${baseUrl}/me/activities`);
		});

		it("getMe → GET /me", async () => {
			await gc.me.getMe();

			expectFetch("GET", `${baseUrl}/me`);
		});
	});

	describe("Notifications", () => {
		it("sendNotification → POST /notifications/send", async () => {
			await gc.notifications.sendNotification({ data: { test: true } });

			expectFetch("POST", `${baseUrl}/notifications/send`, { test: true });
		});
	});

	describe("Organization Members", () => {
		it("listMemberProjectMemberships → GET /organizations/{organizationId}/members/{memberId}/project-memberships", async () => {
			await gc.organizationMembers.listMemberProjectMemberships({
				organizationId: "organizationId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/members/memberId-test/project-memberships`,
			);
		});

		it("listMemberAppMemberships → GET /organizations/{organizationId}/members/{memberId}/app-memberships", async () => {
			await gc.organizationMembers.listMemberAppMemberships({
				organizationId: "organizationId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/members/memberId-test/app-memberships`,
			);
		});

		it("listOrganizationMemberActivities → GET /organizations/{organizationId}/members/{memberId}/activities", async () => {
			await gc.organizationMembers.listOrganizationMemberActivities({
				organizationId: "organizationId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/members/memberId-test/activities`,
			);
		});

		it("getOrganizationMember → GET /organizations/{organizationId}/members/{memberId}", async () => {
			await gc.organizationMembers.getOrganizationMember({
				organizationId: "organizationId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/members/memberId-test`,
			);
		});

		it("listOrganizationMembers → GET /organizations/{organizationId}/members", async () => {
			await gc.organizationMembers.listOrganizationMembers({
				organizationId: "organizationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/members`,
			);
		});
	});

	describe("Organizations", () => {
		it("getServiceAccount → GET /organizations/{organizationId}/service-accounts/{accountId}", async () => {
			await gc.organizations.getServiceAccount({
				organizationId: "organizationId-test",
				accountId: "accountId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/service-accounts/accountId-test`,
			);
		});

		it("listServiceAccounts → GET /organizations/{organizationId}/service-accounts", async () => {
			await gc.organizations.listServiceAccounts({
				organizationId: "organizationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/service-accounts`,
			);
		});

		it("getOrganization → GET /organizations/{organizationId}", async () => {
			await gc.organizations.getOrganization({
				organizationId: "organizationId-test",
			});

			expectFetch("GET", `${baseUrl}/organizations/organizationId-test`);
		});

		it("getOrganizationBySlug → GET /organizations/by-slug/{slug}", async () => {
			await gc.organizations.getOrganizationBySlug({ slug: "slug-test" });

			expectFetch("GET", `${baseUrl}/organizations/by-slug/slug-test`);
		});
	});

	describe("Project Apps", () => {
		it("getProjectAppBySlug → GET /organizations/{organizationId}/projects/{projectId}/apps/by-slug/{appSlug}", async () => {
			await gc.projectApps.getProjectAppBySlug({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appSlug: "appSlug-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/by-slug/appSlug-test`,
			);
		});

		it("getAppSettings → GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings", async () => {
			await gc.projectApps.getAppSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/appId-test/settings`,
			);
		});

		it("updateAppSettings → PATCH /organizations/{organizationId}/projects/{projectId}/apps/{appId}/settings", async () => {
			await gc.projectApps.updateAppSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/appId-test/settings`,
				{ test: true },
			);
		});

		it("getProjectApp → GET /organizations/{organizationId}/projects/{projectId}/apps/{appId}", async () => {
			await gc.projectApps.getProjectApp({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/appId-test`,
			);
		});

		it("listDeletedProjectApps → GET /organizations/{organizationId}/projects/{projectId}/apps/trash", async () => {
			await gc.projectApps.listDeletedProjectApps({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/trash`,
			);
		});

		it("listProjectApps → GET /organizations/{organizationId}/projects/{projectId}/apps", async () => {
			await gc.projectApps.listProjectApps({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps`,
			);
		});
	});

	describe("Project Branding", () => {
		it("getProjectBranding → GET /organizations/{organizationId}/projects/{projectId}/brandings/{brandingId}", async () => {
			await gc.projectBranding.getProjectBranding({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				brandingId: "brandingId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/brandings/brandingId-test`,
			);
		});

		it("listProjectBrandings → GET /organizations/{organizationId}/projects/{projectId}/brandings", async () => {
			await gc.projectBranding.listProjectBrandings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/brandings`,
			);
		});
	});

	describe("Project Domains", () => {
		it("getDomainVerificationInstructions → GET /organizations/{organizationId}/projects/{projectId}/domains/{domainId}/verification", async () => {
			await gc.projectDomains.getDomainVerificationInstructions({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				domainId: "domainId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/domains/domainId-test/verification`,
			);
		});

		it("listProjectDomains → GET /organizations/{organizationId}/projects/{projectId}/domains", async () => {
			await gc.projectDomains.listProjectDomains({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/domains`,
			);
		});
	});

	describe("Project Files", () => {
		it("restoreFileTrashItem → POST /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}/restore", async () => {
			await gc.projectFiles.restoreFileTrashItem({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				itemId: "itemId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/trash/itemId-test/restore`,
				{ test: true },
			);
		});

		it("listFileReferences → GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}/references", async () => {
			await gc.projectFiles.listFileReferences({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/fileId-test/references`,
			);
		});

		it("getFileFolder → GET /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}", async () => {
			await gc.projectFiles.getFileFolder({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				folderId: "folderId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/folders/folderId-test`,
			);
		});

		it("deleteFileFolder → DELETE /organizations/{organizationId}/projects/{projectId}/files/folders/{folderId}", async () => {
			await gc.projectFiles.deleteFileFolder({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				folderId: "folderId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/folders/folderId-test`,
			);
		});

		it("replaceFileContent → PUT /organizations/{organizationId}/projects/{projectId}/files/{fileId}/content", async () => {
			await gc.projectFiles.replaceFileContent({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
				data: { test: true },
			});

			expectFetch(
				"PUT",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/fileId-test/content`,
				{ test: true },
			);
		});

		it("permanentDeleteFileTrashItem → DELETE /organizations/{organizationId}/projects/{projectId}/files/trash/{itemId}", async () => {
			await gc.projectFiles.permanentDeleteFileTrashItem({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				itemId: "itemId-test",
				data: { test: true },
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/trash/itemId-test`,
				{ test: true },
			);
		});

		it("openFile → GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}/open", async () => {
			await gc.projectFiles.openFile({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/fileId-test/open`,
			);
		});

		it("emptyFileTrash → POST /organizations/{organizationId}/projects/{projectId}/files/trash/empty", async () => {
			await gc.projectFiles.emptyFileTrash({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/trash/empty`,
				{ test: true },
			);
		});

		it("getFile → GET /organizations/{organizationId}/projects/{projectId}/files/{fileId}", async () => {
			await gc.projectFiles.getFile({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/fileId-test`,
			);
		});

		it("deleteFile → DELETE /organizations/{organizationId}/projects/{projectId}/files/{fileId}", async () => {
			await gc.projectFiles.deleteFile({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/fileId-test`,
			);
		});

		it("listFileFolders → GET /organizations/{organizationId}/projects/{projectId}/files/folders", async () => {
			await gc.projectFiles.listFileFolders({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/folders`,
			);
		});

		it("searchFiles → GET /organizations/{organizationId}/projects/{projectId}/files/search", async () => {
			await gc.projectFiles.searchFiles({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				query: "query-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/search?query=query-test`,
			);
		});

		it("listFileTrash → GET /organizations/{organizationId}/projects/{projectId}/files/trash", async () => {
			await gc.projectFiles.listFileTrash({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/trash`,
			);
		});

		it("saveFile → POST /organizations/{organizationId}/projects/{projectId}/files/save", async () => {
			await gc.projectFiles.saveFile({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files/save`,
				{ test: true },
			);
		});

		it("listFiles → GET /organizations/{organizationId}/projects/{projectId}/files", async () => {
			await gc.projectFiles.listFiles({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/files`,
			);
		});
	});

	describe("Project Legal Documents", () => {
		it("publishProjectLegalDocument → POST /organizations/{organizationId}/projects/{projectId}/legal/{documentId}/publish", async () => {
			await gc.projectLegalDocuments.publishProjectLegalDocument({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				documentId: "documentId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/legal/documentId-test/publish`,
			);
		});

		it("getProjectLegalDocument → GET /organizations/{organizationId}/projects/{projectId}/legal/{documentId}", async () => {
			await gc.projectLegalDocuments.getProjectLegalDocument({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				documentId: "documentId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/legal/documentId-test`,
			);
		});

		it("updateProjectLegalDocument → PATCH /organizations/{organizationId}/projects/{projectId}/legal/{documentId}", async () => {
			await gc.projectLegalDocuments.updateProjectLegalDocument({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				documentId: "documentId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/legal/documentId-test`,
				{ test: true },
			);
		});

		it("listProjectLegalDocuments → GET /organizations/{organizationId}/projects/{projectId}/legal", async () => {
			await gc.projectLegalDocuments.listProjectLegalDocuments({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/legal`,
			);
		});

		it("createProjectLegalDocument → POST /organizations/{organizationId}/projects/{projectId}/legal", async () => {
			await gc.projectLegalDocuments.createProjectLegalDocument({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/legal`,
				{ test: true },
			);
		});
	});

	describe("Project Members", () => {
		it("getProjectMember → GET /organizations/{organizationId}/projects/{projectId}/members/{memberId}", async () => {
			await gc.projectMembers.getProjectMember({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/members/memberId-test`,
			);
		});

		it("listProjectMembers → GET /organizations/{organizationId}/projects/{projectId}/members", async () => {
			await gc.projectMembers.listProjectMembers({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/members`,
			);
		});
	});

	describe("Project Trash", () => {
		it("restoreProjectTrashBatch → POST /organizations/{organizationId}/projects/{projectId}/trash/batches/{batchId}/restore", async () => {
			await gc.projectTrash.restoreProjectTrashBatch({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				batchId: "batchId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash/batches/batchId-test/restore`,
			);
		});

		it("restoreProjectTrashItem → POST /organizations/{organizationId}/projects/{projectId}/trash/{trashId}/restore", async () => {
			await gc.projectTrash.restoreProjectTrashItem({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				trashId: "trashId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash/trashId-test/restore`,
			);
		});

		it("getProjectTrashItem → GET /organizations/{organizationId}/projects/{projectId}/trash/{trashId}", async () => {
			await gc.projectTrash.getProjectTrashItem({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				trashId: "trashId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash/trashId-test`,
			);
		});

		it("permanentDeleteProjectTrashItem → DELETE /organizations/{organizationId}/projects/{projectId}/trash/{trashId}", async () => {
			await gc.projectTrash.permanentDeleteProjectTrashItem({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				trashId: "trashId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash/trashId-test`,
			);
		});

		it("listProjectTrash → GET /organizations/{organizationId}/projects/{projectId}/trash", async () => {
			await gc.projectTrash.listProjectTrash({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash`,
			);
		});

		it("emptyProjectTrash → DELETE /organizations/{organizationId}/projects/{projectId}/trash", async () => {
			await gc.projectTrash.emptyProjectTrash({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/trash`,
			);
		});
	});

	describe("Project Workflows", () => {
		it("getWorkflowRun → GET /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}", async () => {
			await gc.projectWorkflows.getWorkflowRun({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				runId: "runId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/workflows/runs/runId-test`,
			);
		});

		it("dismissWorkflowRun → DELETE /organizations/{organizationId}/projects/{projectId}/workflows/runs/{runId}", async () => {
			await gc.projectWorkflows.dismissWorkflowRun({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				runId: "runId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/workflows/runs/runId-test`,
			);
		});

		it("listWorkflowRuns → GET /organizations/{organizationId}/projects/{projectId}/workflows/runs", async () => {
			await gc.projectWorkflows.listWorkflowRuns({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/workflows/runs`,
			);
		});

		it("createWorkflowRun → POST /organizations/{organizationId}/projects/{projectId}/workflows/runs", async () => {
			await gc.projectWorkflows.createWorkflowRun({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/workflows/runs`,
				{ test: true },
			);
		});
	});

	describe("Projects", () => {
		it("getProjectBySlug → GET /organizations/{organizationId}/projects/by-slug/{projectSlug}", async () => {
			await gc.projects.getProjectBySlug({
				organizationId: "organizationId-test",
				projectSlug: "projectSlug-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/by-slug/projectSlug-test`,
			);
		});

		it("searchSources → GET /organizations/{organizationId}/projects/{projectId}/search", async () => {
			await gc.projects.searchSources({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				query: "query-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/search?query=query-test`,
			);
		});

		it("listProjectUrls → GET /organizations/{organizationId}/projects/{projectId}/urls", async () => {
			await gc.projects.listProjectUrls({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/urls`,
			);
		});

		it("getProject → GET /organizations/{organizationId}/projects/{projectId}", async () => {
			await gc.projects.getProject({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test`,
			);
		});

		it("listProjects → GET /organizations/{organizationId}/projects", async () => {
			await gc.projects.listProjects({
				organizationId: "organizationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects`,
			);
		});
	});

	describe("Website", () => {
		it("submitContentToSearchEngines → POST /organizations/{organizationId}/projects/{projectId}/content/search-index", async () => {
			await gc.website.submitContentToSearchEngines({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/content/search-index`,
				{ test: true },
			);
		});

		it("getWebsiteConsentSettings → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/consent", async () => {
			await gc.website.getWebsiteConsentSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/consent`,
			);
		});

		it("getWebsiteDialog → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}", async () => {
			await gc.website.getWebsiteDialog({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				dialogId: "dialogId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/dialogs/dialogId-test`,
			);
		});

		it("deleteWebsiteDialog → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs/{dialogId}", async () => {
			await gc.website.deleteWebsiteDialog({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				dialogId: "dialogId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/dialogs/dialogId-test`,
			);
		});

		it("listWebsiteDialogs → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs", async () => {
			await gc.website.listWebsiteDialogs({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/dialogs`,
			);
		});

		it("createWebsiteDialog → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/dialogs", async () => {
			await gc.website.createWebsiteDialog({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/dialogs`,
				{ test: true },
			);
		});

		it("getWebsiteCustomDomain → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains/{domainId}", async () => {
			await gc.website.getWebsiteCustomDomain({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				domainId: "domainId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/domains/domainId-test`,
			);
		});

		it("listWebsiteCustomDomains → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/domains", async () => {
			await gc.website.listWebsiteCustomDomains({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/domains`,
			);
		});

		it("getWebsiteFooter → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}", async () => {
			await gc.website.getWebsiteFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				footerId: "footerId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/footers/footerId-test`,
			);
		});

		it("deleteWebsiteFooter → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers/{footerId}", async () => {
			await gc.website.deleteWebsiteFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				footerId: "footerId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/footers/footerId-test`,
			);
		});

		it("listWebsiteFooters → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers", async () => {
			await gc.website.listWebsiteFooters({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/footers`,
			);
		});

		it("createWebsiteFooter → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/footers", async () => {
			await gc.website.createWebsiteFooter({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/footers`,
				{ test: true },
			);
		});

		it("getWebsiteHeader → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}", async () => {
			await gc.website.getWebsiteHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				headerId: "headerId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/headers/headerId-test`,
			);
		});

		it("deleteWebsiteHeader → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers/{headerId}", async () => {
			await gc.website.deleteWebsiteHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				headerId: "headerId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/headers/headerId-test`,
			);
		});

		it("listWebsiteHeaders → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers", async () => {
			await gc.website.listWebsiteHeaders({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/headers`,
			);
		});

		it("createWebsiteHeader → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/headers", async () => {
			await gc.website.createWebsiteHeader({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/headers`,
				{ test: true },
			);
		});

		it("getWebsiteLanding → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/landing", async () => {
			await gc.website.getWebsiteLanding({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/landing`,
			);
		});

		it("updateWebsiteLandingMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/landing", async () => {
			await gc.website.updateWebsiteLandingMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/landing`,
				{ test: true },
			);
		});

		it("getWebsiteLayout → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}", async () => {
			await gc.website.getWebsiteLayout({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				layoutId: "layoutId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/layouts/layoutId-test`,
			);
		});

		it("deleteWebsiteLayout → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts/{layoutId}", async () => {
			await gc.website.deleteWebsiteLayout({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				layoutId: "layoutId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/layouts/layoutId-test`,
			);
		});

		it("listWebsiteLayouts → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts", async () => {
			await gc.website.listWebsiteLayouts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/layouts`,
			);
		});

		it("createWebsiteLayout → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/layouts", async () => {
			await gc.website.createWebsiteLayout({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/layouts`,
				{ test: true },
			);
		});

		it("getWebsitePage → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}", async () => {
			await gc.website.getWebsitePage({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				pageId: "pageId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages/pageId-test`,
			);
		});

		it("deleteWebsitePage → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}", async () => {
			await gc.website.deleteWebsitePage({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				pageId: "pageId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages/pageId-test`,
			);
		});

		it("updateWebsitePageMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages/{pageId}", async () => {
			await gc.website.updateWebsitePageMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				pageId: "pageId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages/pageId-test`,
				{ test: true },
			);
		});

		it("listWebsitePages → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages", async () => {
			await gc.website.listWebsitePages({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages`,
			);
		});

		it("createWebsitePage → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages", async () => {
			await gc.website.createWebsitePage({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages`,
				{ test: true },
			);
		});

		it("getWebsitePost → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}", async () => {
			await gc.website.getWebsitePost({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				postId: "postId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts/postId-test`,
			);
		});

		it("deleteWebsitePost → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}", async () => {
			await gc.website.deleteWebsitePost({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				postId: "postId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts/postId-test`,
			);
		});

		it("updateWebsitePostMeta → PATCH /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts/{postId}", async () => {
			await gc.website.updateWebsitePostMeta({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				postId: "postId-test",
				data: { test: true },
			});

			expectFetch(
				"PATCH",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts/postId-test`,
				{ test: true },
			);
		});

		it("listWebsitePosts → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts", async () => {
			await gc.website.listWebsitePosts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts`,
			);
		});

		it("createWebsitePost → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts", async () => {
			await gc.website.createWebsitePost({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts`,
				{ test: true },
			);
		});

		it("getWebsiteRedirect → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/redirects/{redirectId}", async () => {
			await gc.website.getWebsiteRedirect({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				redirectId: "redirectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/redirects/redirectId-test`,
			);
		});

		it("listWebsiteRedirects → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/redirects", async () => {
			await gc.website.listWebsiteRedirects({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/redirects`,
			);
		});

		it("getWebsiteSidebar → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}", async () => {
			await gc.website.getWebsiteSidebar({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				sidebarId: "sidebarId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/sidebars/sidebarId-test`,
			);
		});

		it("deleteWebsiteSidebar → DELETE /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars/{sidebarId}", async () => {
			await gc.website.deleteWebsiteSidebar({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				sidebarId: "sidebarId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/sidebars/sidebarId-test`,
			);
		});

		it("listWebsiteSidebars → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars", async () => {
			await gc.website.listWebsiteSidebars({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/sidebars`,
			);
		});

		it("createWebsiteSidebar → POST /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/sidebars", async () => {
			await gc.website.createWebsiteSidebar({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/sidebars`,
				{ test: true },
			);
		});

		it("listWebsiteTags → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags", async () => {
			await gc.website.listWebsiteTags({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/tags`,
			);
		});

		it("getWebsiteTrackingSettings → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tracking", async () => {
			await gc.website.getWebsiteTrackingSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/tracking`,
			);
		});

		it("getWebsiteUrls → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/urls", async () => {
			await gc.website.getWebsiteUrls({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/urls`,
			);
		});
	});
});
