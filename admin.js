function renderPayments() {
  const rows = clearList("payment-rows");
  for (const payment of payments) {
    if (payment.owner === profile.id && payment.mode === mode) {
      addRow(rows, paymentValues(payment));
    }
  }
  if (!rows.children.length) {
    addRow(rows, ["—", "No payments for this mode yet", "—", "—"]);
  }
}

function paymentValues(payment) {
  return [payment.reference, payment.title, "BDT " + payment.amount, payment.status];
}

let reviewSessions = [];

function renderReviews() {
  const select = clearList("review-session");
  addText(select, "option", "Select a completed lesson").value = "";
  reviewSessions = [];
  for (const session of sessions) {
    if (session.owner === profile.id && session.mode === "Learning" && session.status === "Completed" && !session.reviewed) {
      const option = addText(select, "option", session.title + " · " + session.partner);
      option.value = reviewSessions.length;
      reviewSessions.push(session);
      if (session === activeSession) {
        option.selected = true;
      }
    }
  }
  const submit = byId("review-form").querySelector("button");
  submit.disabled = !reviewSessions.length;
  if (!reviewSessions.length) {
    setText("review-form-status", "There are no completed lessons awaiting a review.");
  }
  renderReviewCards("review-list", "Learning");
}

function saveReview() {
  const text = read("review-text");
  if (!text) {
    setText("review-form-status", "Write a short review.");
    return;
  }
  const session = reviewSessions[Number(read("review-session"))];
  reviews.push({
    owner: profile.id,
    mode: "Learning",
    title: session.title,
    partner: session.partner,
    rating: Number(read("review-rating")),
    text: text
  });
  session.reviewed = true;
  byId("review-form").reset();
  renderReviews();
  setText("review-form-status", "Review added.");
}

function renderReviewCards(id, reviewMode) {
  const list = clearList(id);
  for (const review of reviews) {
    if (review.owner === profile.id && review.mode === reviewMode) {
      const card = addCard(list, review.title, review.text);
      addText(card, "p", review.partner + " · " + review.rating + " / 5", "tag");
    }
  }
  showEmpty(list, "No reviews to show yet.");
}

function renderAdmin() {
  let activeUsers = 0;
  let completed = 0;
  for (const user of users) {
    if (user.status === "Active") {
      activeUsers++;
    }
  }
  for (const session of sessions) {
    if (session.status === "Completed") {
      completed++;
    }
  }
  const stats = clearList("admin-stats");
  addStat(stats, "Active users", activeUsers, "Approved member accounts");
  addStat(stats, "Completed lessons", completed, "Completed sessions");
  addStat(stats, "Transactions", payments.length, "Payment records");
}

function rowAction(row, label, action) {
  const cell = addText(row, "td", "");
  if (action) {
    addButton(cell, label, action);
  } else {
    cell.textContent = "—";
  }
}

function renderUsers() {
  const rows = clearList("user-rows");
  for (const user of users) {
    const row = addRow(rows, [user.name, user.status]);
    const label = user.status === "Active" ? "Suspend" : "Approve";
    rowAction(row, label, function () {
      user.status = user.status === "Active" ? "Suspended" : "Active";
      renderUsers();
    });
  }
}

function createCommunity() {
  const name = read("new-community");
  const category = read("new-category");
  const description = read("new-community-description");
  if (!name || !category || !description) {
    setText("community-form-status", "Fill in all three fields.");
    return;
  }
  for (const community of communities) {
    if (community.name.toLowerCase() === name.toLowerCase()) {
      setText("community-form-status", "A community already has that name.");
      return;
    }
  }
  communities.push({name: name, category: category, description: description, archived: false});
  byId("community-form").reset();
  setText("community-form-status", "Community created.");
  renderAdminCommunities();
}

function renderAdminCommunities() {
  const rows = clearList("community-rows");
  for (const community of communities) {
    const status = community.archived ? "Archived" : "Active";
    const row = addRow(rows, [community.name, community.category, status]);
    rowAction(row, community.archived ? "Restore" : "Archive", function () {
      community.archived = !community.archived;
      renderAdminCommunities();
    });
  }
}

function renderReports() {
  const rows = clearList("report-rows");
  for (const report of reports) {
    const row = addRow(rows, [report.name, report.message, report.status]);
    if (report.status === "Open") {
      rowAction(row, "Resolve", function () {
        report.status = "Resolved";
        renderReports();
      });
    } else {
      rowAction(row);
    }
  }
}

function renderAdminPayments() {
  const rows = clearList("admin-payment-rows");
  for (const payment of payments) {
    const row = addRow(rows, paymentValues(payment));
    if (payment.status === "Disputed") {
      rowAction(row, "Resolve dispute", function () {
        payment.status = "Resolved";
        renderAdminPayments();
      });
    } else {
      rowAction(row);
    }
  }
}

function setupAdmin() {
  onSubmit("review-form", saveReview);
  onSubmit("community-form", createCommunity);
}
