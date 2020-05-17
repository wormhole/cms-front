function getUrl(url) {
    return process.env.NODE_ENV === "production" ? url : "/api" + url;
}

export default getUrl;