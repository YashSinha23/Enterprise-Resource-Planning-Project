import React from "react";

const orders = [
	{
		type: "Shipped",
		icon: "↑",
		color: "text-green-600",
		ref: "#ORD-00123",
		notes: "Standard shipment to warehouse",
		date: "2023-10-26",
	},
	{
		type: "Pending",
		icon: "↓",
		color: "text-red-600",
		ref: "#ORD-00124",
		notes: "Expedited order for customer Jane Doe",
		date: "2023-10-25",
	},
	{
		type: "Delivered",
		icon: "↑",
		color: "text-green-600",
		ref: "#ORD-00121",
		notes: "Customer pickup",
		date: "2023-10-22",
	},
	{
		type: "Cancelled",
		icon: "○",
		color: "text-gray-400",
		ref: "#ORD-00122",
		notes: "Customer request",
		date: "2023-10-24",
	},
];

export default function Orders() {
	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="flex items-center mb-6">
					<div className="bg-gray-100 rounded-full p-3 mr-3">
						<span className="text-2xl">🗒️</span>
					</div>
					<div>
						<h1 className="text-3xl font-bold">Orders</h1>
						<p className="text-gray-500">
							A complete log of all customer orders and shipments.
						</p>
					</div>
				</div>

				{/* Controls */}
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<div className="flex flex-wrap gap-4 items-center mb-4">
						<input
							type="text"
							placeholder="Search by reference, notes..."
							className="border rounded px-3 py-2 w-64"
						/>
						<select className="border rounded px-3 py-2">
							<option>All Types</option>
						</select>
						<select className="border rounded px-3 py-2">
							<option>All Time</option>
						</select>
						<button className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100">
							Export
						</button>
						<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto">
							+ New Order
						</button>
					</div>

					{/* Table */}
					<table className="w-full text-left">
						<thead>
							<tr className="text-gray-500 border-b">
								<th className="py-2">TYPE</th>
								<th>REFERENCE</th>
								<th>NOTES</th>
								<th>DATE</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order.ref}
									className="border-b hover:bg-gray-50"
								>
									<td className="py-2 flex items-center gap-2">
										<span
											className={`${order.color} text-lg`}
										>
											{order.icon}
										</span>
										<span className="font-semibold">
											{order.type}
										</span>
									</td>
									<td>{order.ref}</td>
									<td>{order.notes}</td>
									<td>{order.date}</td>
									<td>
										<button className="text-blue-600 mr-2 hover:underline">
											✏️
										</button>
										<button className="text-red-600 hover:underline">
											🗑️
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
