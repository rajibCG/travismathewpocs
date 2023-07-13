import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const appendBodyPart = {
        apiKey: process.env.GIGYA_API_KEY,
        secret: process.env.GIGYA_SECRET,
        userKey: process.env.GIGYA_USER_KEY,
    }

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("apiKey", appendBodyPart.apiKey);
    urlencoded.append("secret", appendBodyPart.secret);
    urlencoded.append("userKey", appendBodyPart.userKey);
    urlencoded.append("email", body.email);
    urlencoded.append("password", body.password);
    urlencoded.append("profile", "{'firstName':'" + body.firstName + "','lastName':'" + body.lastName + "'}");
    urlencoded.append("finalizeRegistration", "true");
    urlencoded.append("preferences", `{
    "terms": {
        "travismathew": {
            "com": {
                "isConsentGranted": "true"
            },
            "rewards": {
                "com": {
                    "isConsentGranted": "true"
                }
            }
        }
    },
    "privacy": {
        "travismathew": {
            "isConsentGranted": "true"
        }
    },
    "AdAndCookie": {
        "travismathew": {
            "com": {
                "isConsentGranted": "true"
            }
       }
    }
}`);

    urlencoded.append("lang", "en");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    const responseMsg = {
        status: 200,
        data: null,
        message: null
    }
    try {
        const response = await fetch(`${process.env.GIGYA_API_URL}/accounts.register`, requestOptions)
            .then(response => response.json())
        responseMsg.isRegistered = response.isRegistered;
        if (response.isRegistered) {
            responseMsg.message = 'Profile created successfully.';
        } else {
            if (response.validationErrors) {
                let errors = {};
                for (let ele of response.validationErrors) {
                    errors[ele.fieldName] = ele.message
                }
                responseMsg.data = errors;
            }
            responseMsg.message = response.errorMessage
            responseMsg.status = 400;
        }

    } catch (ex) {
        responseMsg.status = ex.status || 400;
        responseMsg.message = 'Something went wrong.Please try again later.';
    }
    return NextResponse.json(responseMsg, { status: responseMsg.status })
}