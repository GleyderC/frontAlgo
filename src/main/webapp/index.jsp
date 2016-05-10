<html>
<head>
    <title>Collateral Frontend</title>
</head>
<body>
    <h2>Hi! Please Wait...</h2>
    <%
        // New location to be redirected
        String site = new String("app/");
        response.setStatus(response.SC_MOVED_TEMPORARILY);
        response.setHeader("Location", site);
    %>
</body>
</html>
