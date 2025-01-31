import config from "../../config";

const getUser = async (data) => {

    try {
        let found = await fetch(`${config.apidatabaseVotePrefix}/get_topic`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let f_data = await found.json()

        if (f_data) {
            return f_data
        } else {
            let res = await fetch(`${config.apiPrefix}/get_user?id=${data.id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            let new_data = await res.json();

            let new_obj = {
                title: new_data.speakingTopic,
                speaker: new_data.nickName,
                description: "",
                long_duration: false,
                category: 0,
            }

            return new_obj
        }
    } catch (error) {
        return error.errors;
    }
};

const addtoPending = async (data) => {
    try {
        let res = await fetch(`${config.apidatabaseVotePrefix}/add_to_pending`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const get_all_pending = async () => {
    try {
        let res = await fetch(`${config.apidatabaseVotePrefix}/get_all`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const add_topic = async (data) => {
    try {
        let res = await fetch(`${config.apidatabaseVotePrefix}/add_topic`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        return error.errors;
    }
}

const recommendTopic = async (data) => {
    try {
        let res = await fetch(`${config.apidatabaseVotePrefix}/recommend`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
}

export { getUser, addtoPending, get_all_pending, add_topic , recommendTopic };
