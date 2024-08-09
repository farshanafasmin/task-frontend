import axios from "axios";

export const commonApi = async (method, url, reqBody, reqHeader) => {

    const config = {
        method,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "content-type": "application/json" }
    }

    // create axios instance (api call using axios)

    return await axios(config).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}