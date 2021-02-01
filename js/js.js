const links = [
	{
		label: "Week 01",
		url: "week1/ninjaquiz.html"
	},
	{
		label: "Week 02 Drums",
		url: "week2/index.html"
	},
	{
		label: "Week 03 for stuff",
		url: "week3/index.html"
	},
	{
		label: "Week 04 tic-tac-toe",
		url: "week4/index.html"
	},
	{
		label: "Week 04 Notes",
		url: "week1/app.html"
	},
	{
		label: "Week 05 ok",
		url: "week1/app.html"
	}
];

const ol = document.querySelector("ol");

for (const item of links) {
	const li = document.createElement("li");
	const a = document.createElement("a");
	a.setAttribute("href", item.url);
	a.textContent = item.label;
	li.appendChild(a);

	ol.appendChild(li);
}
