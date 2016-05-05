<%@ page import="java.util.GregorianCalendar" %>
<%@ page import="java.util.Calendar" %>
<footer>
<div class="copyright">
    <%
        GregorianCalendar cal = new GregorianCalendar();
        out.print(cal.get(Calendar.YEAR));
    %> &copy; Collateral - Common Management Solutions.
</div>
<div class="scroll-to-top">
    <i class="icon-arrow-up"></i>
</div>
</footer>
