const api_url = "https://testapp023.herokuapp.com/agent"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].Agent_code}</td>`;
		table_data += `<td>${records[i].Agent_name}</td>`;
		table_data += `<td>${records[i].DOB}</td>`;
		table_data += `<td>${records[i].Address}</td>`;
		table_data += `<td>${records[i].Pincode}</td>`;
		table_data += `<td>${records[i].Branch}</td>`;
		table_data += `<td>${records[i].Contact_Num}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i].Agent_code}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i].Agent_code}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		loadData(data);
	});
}


function getDataById(Agent_code) {
	fetch(`${api_url}/${Agent_code}`)
	.then((response) => response.json())
	.then((data) => { 
		document.getElementById("Agent_code").value;
		document.getElementById("Agent_name").value;
		document.getElementById("DOB").value;
		document.getElementById("Address").value;
		document.getElementById("Pincode").value;
		document.getElementById("Branch").value;
		document.getElementById("Contact_Num").value;
	})
}


function postData() {
	var ac = document.getElementById("Agent_code").value;
	var an = document.getElementById("Agent_name").value;
	var dob = document.getElementById("DOB").value;
	var add = document.getElementById("Address").value;
	var pc = document.getElementById("Pincode").value;
	var br = document.getElementById("Branch").value;
	var cno = document.getElementById("Contact_Num").value;
	
	data = {Agent_code: ac, Agent_name: an, DOB: dob, Address: add, Pincode: pc, Branch: br, Contact_Num: cno};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var ac = document.getElementById("Agent_code").value;
	var an = document.getElementById("Agent_name").value;
	var dob = document.getElementById("DOB").value;
	var add = document.getElementById("Address").value;
	var pc = document.getElementById("Pincode").value;
	var br = document.getElementById("Branch").value;
	var cno = document.getElementById("Contact_Num").value;
	
	data = {Agent_code: ac ,Agent_name: an, DOB: dob, Address: add, Pincode: pc, Branch: br, Contact_Num: cno};
	
	console.log(data);
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		window.location.href = "index.html";
	})
}


function deleteData(Agent_code) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"Agent_code": Agent_code})
		})
		.then((response) => response.json())
		.then((data) => { 
			window.location.reload();
		})
	}
}