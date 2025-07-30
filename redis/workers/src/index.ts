const { createClient } = require("redis");

const client = createClient();

async function main() {
    await client.connect();
    console.log("Worker started");

    while (true) {
        const response = await client.rPop("submissions");

        if (response) {
            const submission = JSON.parse(response);
            console.log("Got submission:", submission);

            // Send to pub/sub (optional)
            await client.publish("submission_channel", JSON.stringify(submission));
        }

        await new Promise((r) => setTimeout(r, 1000)); // wait 1 sec
    }
}

main();
