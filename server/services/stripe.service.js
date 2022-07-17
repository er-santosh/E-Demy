const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default {
  async createAccount() {
    return await stripe.accounts.create({ type: "express" });
  },

  async createAccountLink(accountId) {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
  },

  async retrieveAccount(accountId) {
    return await stripe.accounts.retrieve(accountId);
  },
};
