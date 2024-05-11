import React, { useState } from 'react';

function TourPackages() {
    // Mock tour packages data
    const mockTourPackages = [
        { id: 1, name: 'Package 1', details: 'Details for Package 1' },
        { id: 2, name: 'Package 2', details: 'Details for Package 2' },
        { id: 3, name: 'Package 3', details: 'Details for Package 3' },
    ];

    // State for managing form inputs
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add functionality to save tour package data
        console.log("Tour package added:", { name, details });
        // Reset form inputs
        setName('');
        setDetails('');
    };

    return (
        <div className="container px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Tour Packages</h1>
            
            {/* Add Tour Package Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label htmlFor="packageName" className="mr-2">Name:</label>
                    <input
                        id="packageName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="packageDetails" className="mr-2">Details:</label>
                    <input
                        id="packageDetails"
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
            </form>

            {/* Tour Packages Table */}
            <table className="w-full table-auto">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-600 text-white">
                    {mockTourPackages.map(tourPackage => (
                        <tr key={tourPackage.id}>
                            <td className="border px-4 py-2 text-center">{tourPackage.id}</td>
                            <td className="border px-4 py-2">{tourPackage.name}</td>
                            <td className="border px-4 py-2">{tourPackage.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TourPackages;
