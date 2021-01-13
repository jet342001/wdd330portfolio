const links = [
	{
		label: "Week 01",
		url: "week1/"
	},
	{
		label: "Week 02 Notes",
		url: "week2/notes.html"
	},
	{
		label: "Week 02 Application",
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
