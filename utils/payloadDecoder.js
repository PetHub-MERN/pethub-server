const payloadDecoder = authorization => {
    const token = authorization.split(" ")[1];
    const encodedPayload = token.split(".")[1];
    const decodedPayload = Buffer.from(
        encodedPayload.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
    ).toString("utf-8");

    const payloadData = JSON.parse(decodedPayload);
    return payloadData;
}

module.exports = {
    payloadDecoder
};