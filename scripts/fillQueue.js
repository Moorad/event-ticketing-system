console.log(process.argv);

const numOfReq = Number(process.argv[2]);

for (let i = 0; i < numOfReq; i++) {
	fetch("http://localhost:4000/queue/check", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ uid: 99, eid: i }),
	})
		.then((res) => res.json())
		.then((json) => {
			console.log("Req:", i);
			console.log(json);
		});
}
