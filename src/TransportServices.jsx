import React, { useState } from 'react';

function TransportServices() {
    // Mock transport services data
    const mockTransportServices = [
        { id: 1, name: 'Service 1', details: 'Details for Service 1' },
        { id: 2, name: 'Service 2', details: 'Details for Service 2' },
        { id: 3, name: 'Service 3', details: 'Details for Service 3' },
    ];

    // State for managing form inputs
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add functionality to save transport service data
        console.log("Transport service added:", { name, details });
        // Reset form inputs
        setName('');
        setDetails('');
    };

    return (
        <div className="container px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Transport Services</h1>
            
            {/* Add Transport Service Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label htmlFor="serviceName" className="mr-2">Name:</label>
                    <input
                        id="serviceName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="serviceDetails" className="mr-2">Details:</label>
                    <input
                        id="serviceDetails"
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
            </form>

            {/* Transport Services Table */}
            <table className="w-full table-auto">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-600 text-white">
                    {mockTransportServices.map(transportService => (
                        <tr key={transportService.id}>
                            <td className="border px-4 py-2 text-center">{transportService.id}</td>
                            <td className="border px-4 py-2">{transportService.name}</td>
                            <td className="border px-4 py-2">{transportService.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransportServices;
