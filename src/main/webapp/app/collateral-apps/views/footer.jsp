<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.GregorianCalendar" %>
<footer class="footer">
    <div class="copyright">
        <%
            GregorianCalendar cal = new GregorianCalendar();
            out.print(cal.get(Calendar.YEAR));
        %> &copy; Collateral - Common Management Solutions.
    </div>
    <a class="go2top hide">
        <i class="icon-arrow-up"></i>
    </a>
</footer>
