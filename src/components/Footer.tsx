export default function Footer() {
    const currentYear = (new Date()).getFullYear();

    return <footer>
        &copy; {currentYear} - Made with 👐 by <a href="https://github.com/tbgracy" target="_blank">@tbgracy</a>
    </footer>
}