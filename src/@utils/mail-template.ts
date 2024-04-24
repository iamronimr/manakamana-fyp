interface IHiringData {
  workerName: string;
  service: string;
  workeraddress: string;
  workercontact: string;
  hireby: string;
  customer_email: string;
}
export function hireWorkerTemplate(data: IHiringData) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Inline CSS */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Wants To Hire Your Worker</h1>
        <p>Hello Admin,</p>
        <p>A your worker has been hired by a client. Below are the details:</p>
        <table>
            <tr>
                <th>Attribute</th>
                <th>Value</th>
            </tr>
            <tr>
                <td><strong>Worker Name:</strong></td>
                <td>${data.workerName}</td>
            </tr>
            <tr>
                <td><strong>Service Type:</strong></td>
                <td>${data.service}</td>
            </tr>
            <tr>
                <td><strong>Worker Address:</strong></td>
                <td>${data.workeraddress}</td>
            </tr>
            <tr>
                <td><strong>Worker Contact:</strong></td>
                <td>${data.workercontact}</td>
            </tr>
            <tr>
                <td><strong>Hired By:</strong></td>
                <td>${data.hireby}</td>
            </tr>
            <tr>
                <td><strong>Customer Email:</strong></td>
                <td>${data.customer_email}</td>
            </tr>
        </table>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best Regards,<br>Manakamana Online</p>
    </div>
</body>
</html>

    `;
}
