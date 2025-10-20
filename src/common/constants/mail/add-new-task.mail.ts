export const addNewTaskMail = ({
  user_name,
  task_name,
  task_desc,
  due_date,
  status,
}: {
  user_name: string;
  task_name: string;
  task_desc: string | null;
  due_date: string;
  status: string;
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Indonesia Crypto Network Test</title>
    <style>
      body {
        background-color: #f4f6f8;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      }
      .header {
        background: #2563eb;
        color: #ffffff;
        text-align: center;
        padding: 25px 20px;
      }
      .header h2 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 25px 30px;
        color: #333333;
        line-height: 1.6;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
      }
      td {
        padding: 6px 0;
        vertical-align: top;
        font-size: 15px;
      }
      td.label {
        width: 120px;
        font-weight: 600;
        color: #111827;
      }
      td.colon {
        width: 10px;
        font-weight: 600;
      }
      td.value {
        color: #374151;
      }
      .footer {
        background: #f1f5f9;
        text-align: center;
        font-size: 13px;
        color: #777777;
        padding: 15px;
      }
      @media (max-width: 600px) {
        .container {
          margin: 15px;
        }
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Indonesia Crypto Network Test</h2>
      </div>
      <div class="content">
        <p>Hi <strong>${user_name}</strong>,</p>
        <p>A new task has been added to your task list:</p>

        <table>
          <tr>
            <td class="label">Task Name</td>
            <td class="colon">:</td>
            <td class="value">${task_name}</td>
          </tr>
          <tr>
            <td class="label">Description</td>
            <td class="colon">:</td>
            <td class="value">${task_desc ?? "-"}</td>
          </tr>
          <tr>
            <td class="label">Due Date</td>
            <td class="colon">:</td>
            <td class="value">${due_date}</td>
          </tr>
          <tr>
            <td class="label">Status</td>
            <td class="colon">:</td>
            <td class="value">${status}</td>
          </tr>
        </table>

        <p>Keep up the great work!</p>
      </div>
      <div class="footer">
        © 2025 ICN Task Management System. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
