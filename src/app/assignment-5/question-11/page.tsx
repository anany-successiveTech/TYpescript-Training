// app/assignment-5/question-11/page.tsx
"use client";

import UserListWithData from "@/component/userList"
const fakeUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", email: "diana@example.com" },
  { id: 5, name: "Evan Lee", email: "evan@example.com" },
];

export default function Question11Page() {
  return (
    <div>
      <h1>User List</h1>
      <UserListWithData data={fakeUsers} />
    </div>
  );
}
