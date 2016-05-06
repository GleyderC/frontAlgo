<%@ page import="java.util.GregorianCalendar" %>
<%@ page import="java.util.Calendar" %>
<footer class="footer">
<div class="copyright">
    <%
        GregorianCalendar cal = new GregorianCalendar();
        out.print(cal.get(Calendar.YEAR));
    %> &copy; Collateral - Common Management Solutions.
</div>

</footer>
