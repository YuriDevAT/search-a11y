function trimHTML(html) {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ');
    return text.replace(/\s\s+/g, ' ').trim().substring(0, 5000);
}

module.exports = {
    trimHTML
};