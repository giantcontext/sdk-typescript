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
			await gc.apiKeys.listMyApiKeys();

			expectFetch("GET", `${baseUrl}/me/api-keys`);
		});

		it("listOrganizationApiKeys → GET /organizations/{id}/api-keys", async () => {
			await gc.apiKeys.listOrganizationApiKeys({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/organizations/id-test/api-keys`);
		});
	});

	describe("App Members", () => {
		it("getAppMember → GET /organizations/{id}/projects/{projectId}/apps/{appId}/members/{memberId}", async () => {
			await gc.appMembers.getAppMember({
				id: "id-test",
				projectId: "projectId-test",
				appId: "appId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps/appId-test/members/memberId-test`,
			);
		});

		it("getAppMembers → GET /organizations/{id}/projects/{projectId}/apps/{appId}/members", async () => {
			await gc.appMembers.getAppMembers({
				id: "id-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps/appId-test/members`,
			);
		});
	});

	describe("Bug Reports", () => {
		it("listMyBugReports → GET /me/bug-reports", async () => {
			await gc.bugReports.listMyBugReports();

			expectFetch("GET", `${baseUrl}/me/bug-reports`);
		});

		it("getBugReportComments → GET /me/bug-reports/{id}/comments", async () => {
			await gc.bugReports.getBugReportComments({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/me/bug-reports/id-test/comments`);
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

		it("getCrmActivitiesList → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/activities", async () => {
			await gc.crm.getCrmActivitiesList({
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

		it("getCrmCompanyActivities → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/activities", async () => {
			await gc.crm.getCrmCompanyActivities({
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

		it("getCrmCompanyContacts → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies/{companyId}/contacts", async () => {
			await gc.crm.getCrmCompanyContacts({
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

		it("getCrmCompaniesList → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/companies", async () => {
			await gc.crm.getCrmCompaniesList({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/crm/appId-test/companies`,
			);
		});

		it("getCrmContactActivities → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}/activities", async () => {
			await gc.crm.getCrmContactActivities({
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

		it("updateCrmContact → PUT /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts/{contactId}", async () => {
			await gc.crm.updateCrmContact({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
				contactId: "contactId-test",
				data: { test: true },
			});

			expectFetch(
				"PUT",
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

		it("getCrmContactsList → GET /organizations/{organizationId}/projects/{projectId}/apps/crm/{appId}/contacts", async () => {
			await gc.crm.getCrmContactsList({
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

		it("listDevelopersSyncLogs → GET /organizations/{organizationId}/projects/{projectId}/apps/developers/{appId}/sync-logs", async () => {
			await gc.developers.listDevelopersSyncLogs({
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
		it("generateDraft → POST /drafts/generate", async () => {
			await gc.drafts.generateDraft({ data: { test: true } });

			expectFetch("POST", `${baseUrl}/drafts/generate`, { test: true });
		});

		it("editDraft → POST /drafts/edit", async () => {
			await gc.drafts.editDraft({ data: { test: true } });

			expectFetch("POST", `${baseUrl}/drafts/edit`, { test: true });
		});

		it("unarchiveDraft → POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/unarchive", async () => {
			await gc.drafts.unarchiveDraft({
				id: "id-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/drafts/draftId-test/unarchive`,
			);
		});

		it("archiveDraft → POST /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}/archive", async () => {
			await gc.drafts.archiveDraft({
				id: "id-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/drafts/draftId-test/archive`,
			);
		});

		it("getDraft → GET /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}", async () => {
			await gc.drafts.getDraft({
				id: "id-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/drafts/draftId-test`,
			);
		});

		it("deleteDraft → DELETE /organizations/{id}/projects/{projectId}/mind/drafts/{draftId}", async () => {
			await gc.drafts.deleteDraft({
				id: "id-test",
				projectId: "projectId-test",
				draftId: "draftId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/drafts/draftId-test`,
			);
		});

		it("listDrafts → GET /organizations/{id}/projects/{projectId}/mind/drafts", async () => {
			await gc.drafts.listDrafts({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/drafts`,
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

		it("getEmailRecipients → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails/{emailId}/recipients", async () => {
			await gc.email.getEmailRecipients({
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

		it("getEmails → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/emails", async () => {
			await gc.email.getEmails({
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

		it("getEmailSends → GET /organizations/{organizationId}/projects/{projectId}/apps/email/{appId}/sends", async () => {
			await gc.email.getEmailSends({
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
		it("getPopularFeatureRequests → GET /me/feature-requests/popular", async () => {
			await gc.featureRequests.getPopularFeatureRequests({});

			expectFetch("GET", `${baseUrl}/me/feature-requests/popular`);
		});

		it("listMyFeatureRequests → GET /me/feature-requests", async () => {
			await gc.featureRequests.listMyFeatureRequests();

			expectFetch("GET", `${baseUrl}/me/feature-requests`);
		});

		it("getFeatureRequestComments → GET /me/feature-requests/{id}/comments", async () => {
			await gc.featureRequests.getFeatureRequestComments({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/me/feature-requests/id-test/comments`);
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

		it("getFormSubmissions → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms/{formId}/submissions", async () => {
			await gc.forms.getFormSubmissions({
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

		it("getFormsList → GET /organizations/{organizationId}/projects/{projectId}/apps/forms/{appId}/forms", async () => {
			await gc.forms.getFormsList({
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
		it("approveIdea → POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/approve", async () => {
			await gc.ideas.approveIdea({
				id: "id-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/ideas/ideaId-test/approve`,
				{ test: true },
			);
		});

		it("dismissIdea → POST /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}/dismiss", async () => {
			await gc.ideas.dismissIdea({
				id: "id-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/ideas/ideaId-test/dismiss`,
				{ test: true },
			);
		});

		it("getIdea → GET /organizations/{id}/projects/{projectId}/mind/ideas/{ideaId}", async () => {
			await gc.ideas.getIdea({
				id: "id-test",
				projectId: "projectId-test",
				ideaId: "ideaId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/ideas/ideaId-test`,
			);
		});

		it("listIdeas → GET /organizations/{id}/projects/{projectId}/mind/ideas", async () => {
			await gc.ideas.listIdeas({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/ideas`,
			);
		});

		it("triggerIdeation → POST /organizations/{id}/projects/{projectId}/mind/ideas", async () => {
			await gc.ideas.triggerIdeation({
				id: "id-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/mind/ideas`,
				{ test: true },
			);
		});
	});

	describe("Invitations", () => {
		it("getOrganizationInvitation → GET /organizations/{id}/invitations/{invitationId}", async () => {
			await gc.invitations.getOrganizationInvitation({
				id: "id-test",
				invitationId: "invitationId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/invitations/invitationId-test`,
			);
		});

		it("getOrganizationInvitations → GET /organizations/{id}/invitations", async () => {
			await gc.invitations.getOrganizationInvitations({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/organizations/id-test/invitations`);
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

		it("getKbSettings → GET /organizations/{organizationId}/projects/{projectId}/apps/kb/{appId}/settings", async () => {
			await gc.kb.getKbSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/kb/appId-test/settings`,
			);
		});
	});

	describe("Me", () => {
		it("getMySuspensionMessages → GET /me/suspension-messages", async () => {
			await gc.me.getMySuspensionMessages();

			expectFetch("GET", `${baseUrl}/me/suspension-messages`);
		});

		it("getMyNotifications → GET /me/notifications", async () => {
			await gc.me.getMyNotifications({});

			expectFetch("GET", `${baseUrl}/me/notifications`);
		});

		it("getMyOrganizations → GET /me/organizations", async () => {
			await gc.me.getMyOrganizations();

			expectFetch("GET", `${baseUrl}/me/organizations`);
		});

		it("getMyInvitations → GET /me/invitations", async () => {
			await gc.me.getMyInvitations();

			expectFetch("GET", `${baseUrl}/me/invitations`);
		});

		it("getMyActivities → GET /me/activities", async () => {
			await gc.me.getMyActivities({});

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
		it("getMemberProjectMemberships → GET /organizations/{id}/members/{memberId}/project-memberships", async () => {
			await gc.organizationMembers.getMemberProjectMemberships({
				id: "id-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/members/memberId-test/project-memberships`,
			);
		});

		it("getOrganizationMemberActivities → GET /organizations/{id}/members/{memberId}/activities", async () => {
			await gc.organizationMembers.getOrganizationMemberActivities({
				id: "id-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/members/memberId-test/activities`,
			);
		});

		it("getOrganizationMember → GET /organizations/{id}/members/{memberId}", async () => {
			await gc.organizationMembers.getOrganizationMember({
				id: "id-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/members/memberId-test`,
			);
		});

		it("getOrganizationMembers → GET /organizations/{id}/members", async () => {
			await gc.organizationMembers.getOrganizationMembers({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/organizations/id-test/members`);
		});
	});

	describe("Organizations", () => {
		it("getServiceAccount → GET /organizations/{id}/service-accounts/{accountId}", async () => {
			await gc.organizations.getServiceAccount({
				id: "id-test",
				accountId: "accountId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/service-accounts/accountId-test`,
			);
		});

		it("listServiceAccounts → GET /organizations/{id}/service-accounts", async () => {
			await gc.organizations.listServiceAccounts({ id: "id-test" });

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/service-accounts`,
			);
		});

		it("getOrganizationBySlug → GET /organizations/by-slug/{slug}", async () => {
			await gc.organizations.getOrganizationBySlug({ slug: "slug-test" });

			expectFetch("GET", `${baseUrl}/organizations/by-slug/slug-test`);
		});

		it("getOrganization → GET /organizations/{id}", async () => {
			await gc.organizations.getOrganization({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/organizations/id-test`);
		});
	});

	describe("Project Apps", () => {
		it("getProjectAppBySlug → GET /organizations/{id}/projects/{projectId}/apps/by-slug/{appSlug}", async () => {
			await gc.projectApps.getProjectAppBySlug({
				id: "id-test",
				projectId: "projectId-test",
				appSlug: "appSlug-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps/by-slug/appSlug-test`,
			);
		});

		it("getProjectApp → GET /organizations/{id}/projects/{projectId}/apps/{appId}", async () => {
			await gc.projectApps.getProjectApp({
				id: "id-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps/appId-test`,
			);
		});

		it("getDeletedProjectApps → GET /organizations/{id}/projects/{projectId}/apps/trash", async () => {
			await gc.projectApps.getDeletedProjectApps({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps/trash`,
			);
		});

		it("getProjectApps → GET /organizations/{id}/projects/{projectId}/apps", async () => {
			await gc.projectApps.getProjectApps({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/apps`,
			);
		});
	});

	describe("Project Branding", () => {
		it("getProjectBranding → GET /organizations/{id}/projects/{projectId}/brandings/{brandingId}", async () => {
			await gc.projectBranding.getProjectBranding({
				id: "id-test",
				projectId: "projectId-test",
				brandingId: "brandingId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/brandings/brandingId-test`,
			);
		});

		it("listProjectBrandings → GET /organizations/{id}/projects/{projectId}/brandings", async () => {
			await gc.projectBranding.listProjectBrandings({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/brandings`,
			);
		});
	});

	describe("Project Domains", () => {
		it("getDomainVerificationInstructions → GET /organizations/{id}/projects/{projectId}/domains/{domainId}/verification", async () => {
			await gc.projectDomains.getDomainVerificationInstructions({
				id: "id-test",
				projectId: "projectId-test",
				domainId: "domainId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/domains/domainId-test/verification`,
			);
		});

		it("listProjectDomains → GET /organizations/{id}/projects/{projectId}/domains", async () => {
			await gc.projectDomains.listProjectDomains({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/domains`,
			);
		});
	});

	describe("Project Files", () => {
		it("getFileReferences → GET /organizations/{id}/projects/{projectId}/files/{fileId}/references", async () => {
			await gc.projectFiles.getFileReferences({
				id: "id-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/fileId-test/references`,
			);
		});

		it("getFileFolder → GET /organizations/{id}/projects/{projectId}/files/folders/{folderId}", async () => {
			await gc.projectFiles.getFileFolder({
				id: "id-test",
				projectId: "projectId-test",
				folderId: "folderId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/folders/folderId-test`,
			);
		});

		it("replaceFileContent → PUT /organizations/{id}/projects/{projectId}/files/{fileId}/content", async () => {
			await gc.projectFiles.replaceFileContent({
				id: "id-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
				data: { test: true },
			});

			expectFetch(
				"PUT",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/fileId-test/content`,
				{ test: true },
			);
		});

		it("openFile → GET /organizations/{id}/projects/{projectId}/files/{fileId}/open", async () => {
			await gc.projectFiles.openFile({
				id: "id-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/fileId-test/open`,
			);
		});

		it("getFile → GET /organizations/{id}/projects/{projectId}/files/{fileId}", async () => {
			await gc.projectFiles.getFile({
				id: "id-test",
				projectId: "projectId-test",
				fileId: "fileId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/fileId-test`,
			);
		});

		it("getFileFolders → GET /organizations/{id}/projects/{projectId}/files/folders", async () => {
			await gc.projectFiles.getFileFolders({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/folders`,
			);
		});

		it("searchFiles → GET /organizations/{id}/projects/{projectId}/files/search", async () => {
			await gc.projectFiles.searchFiles({
				id: "id-test",
				projectId: "projectId-test",
				query: "query-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/search?query=query-test`,
			);
		});

		it("listFileTrash → GET /organizations/{id}/projects/{projectId}/files/trash", async () => {
			await gc.projectFiles.listFileTrash({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/trash`,
			);
		});

		it("saveFile → POST /organizations/{id}/projects/{projectId}/files/save", async () => {
			await gc.projectFiles.saveFile({
				id: "id-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files/save`,
				{ test: true },
			);
		});

		it("getFiles → GET /organizations/{id}/projects/{projectId}/files", async () => {
			await gc.projectFiles.getFiles({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/files`,
			);
		});
	});

	describe("Project Legal Documents", () => {
		it("getProjectLegalDocument → GET /organizations/{id}/projects/{projectId}/legal/{documentId}", async () => {
			await gc.projectLegalDocuments.getProjectLegalDocument({
				id: "id-test",
				projectId: "projectId-test",
				documentId: "documentId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/legal/documentId-test`,
			);
		});

		it("listProjectLegalDocuments → GET /organizations/{id}/projects/{projectId}/legal", async () => {
			await gc.projectLegalDocuments.listProjectLegalDocuments({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/legal`,
			);
		});
	});

	describe("Project Members", () => {
		it("getProjectMember → GET /organizations/{id}/projects/{projectId}/members/{memberId}", async () => {
			await gc.projectMembers.getProjectMember({
				id: "id-test",
				projectId: "projectId-test",
				memberId: "memberId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/members/memberId-test`,
			);
		});

		it("getProjectMembers → GET /organizations/{id}/projects/{projectId}/members", async () => {
			await gc.projectMembers.getProjectMembers({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/members`,
			);
		});
	});

	describe("Project Trash", () => {
		it("getProjectTrashItem → GET /organizations/{id}/projects/{projectId}/trash/{trashId}", async () => {
			await gc.projectTrash.getProjectTrashItem({
				id: "id-test",
				projectId: "projectId-test",
				trashId: "trashId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/trash/trashId-test`,
			);
		});

		it("listProjectTrash → GET /organizations/{id}/projects/{projectId}/trash", async () => {
			await gc.projectTrash.listProjectTrash({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/trash`,
			);
		});
	});

	describe("Project Workflows", () => {
		it("getWorkflowRun → GET /organizations/{id}/projects/{projectId}/workflows/runs/{runId}", async () => {
			await gc.projectWorkflows.getWorkflowRun({
				id: "id-test",
				projectId: "projectId-test",
				runId: "runId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/workflows/runs/runId-test`,
			);
		});

		it("dismissWorkflowRun → DELETE /organizations/{id}/projects/{projectId}/workflows/runs/{runId}", async () => {
			await gc.projectWorkflows.dismissWorkflowRun({
				id: "id-test",
				projectId: "projectId-test",
				runId: "runId-test",
			});

			expectFetch(
				"DELETE",
				`${baseUrl}/organizations/id-test/projects/projectId-test/workflows/runs/runId-test`,
			);
		});

		it("listWorkflowRuns → GET /organizations/{id}/projects/{projectId}/workflows/runs", async () => {
			await gc.projectWorkflows.listWorkflowRuns({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/workflows/runs`,
			);
		});

		it("createWorkflowRun → POST /organizations/{id}/projects/{projectId}/workflows/runs", async () => {
			await gc.projectWorkflows.createWorkflowRun({
				id: "id-test",
				projectId: "projectId-test",
				data: { test: true },
			});

			expectFetch(
				"POST",
				`${baseUrl}/organizations/id-test/projects/projectId-test/workflows/runs`,
				{ test: true },
			);
		});
	});

	describe("Projects", () => {
		it("getProjectBySlug → GET /organizations/{id}/projects/by-slug/{projectSlug}", async () => {
			await gc.projects.getProjectBySlug({
				id: "id-test",
				projectSlug: "projectSlug-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/by-slug/projectSlug-test`,
			);
		});

		it("searchProject → GET /organizations/{id}/projects/{projectId}/search", async () => {
			await gc.projects.searchProject({
				id: "id-test",
				projectId: "projectId-test",
				query: "query-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/search?query=query-test`,
			);
		});

		it("getProjectUrls → GET /organizations/{id}/projects/{projectId}/urls", async () => {
			await gc.projects.getProjectUrls({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test/urls`,
			);
		});

		it("getProject → GET /organizations/{id}/projects/{projectId}", async () => {
			await gc.projects.getProject({
				id: "id-test",
				projectId: "projectId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/id-test/projects/projectId-test`,
			);
		});

		it("getProjects → GET /organizations/{id}/projects", async () => {
			await gc.projects.getProjects({ id: "id-test" });

			expectFetch("GET", `${baseUrl}/organizations/id-test/projects`);
		});
	});

	describe("Website", () => {
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

		it("getWebsitePages → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/pages", async () => {
			await gc.website.getWebsitePages({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/pages`,
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

		it("getWebsitePosts → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/posts", async () => {
			await gc.website.getWebsitePosts({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/posts`,
			);
		});

		it("getWebsiteAppSettings → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/settings", async () => {
			await gc.website.getWebsiteAppSettings({
				organizationId: "organizationId-test",
				projectId: "projectId-test",
				appId: "appId-test",
			});

			expectFetch(
				"GET",
				`${baseUrl}/organizations/organizationId-test/projects/projectId-test/apps/website/appId-test/settings`,
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

		it("getWebsiteTags → GET /organizations/{organizationId}/projects/{projectId}/apps/website/{appId}/tags", async () => {
			await gc.website.getWebsiteTags({
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
