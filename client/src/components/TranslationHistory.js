// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';

// function TranslationHistory({ user }) {
//     const [history, setHistory] = useState([]);

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/getTranslationHistory/${user}`)
//             .then(response => setHistory(response.data))
//             .catch(err => console.error(err));
//     }, [user]);

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4">Translation History</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Original Text</th>
//                         <th>Translated Text</th>
//                         <th>Source Language</th>
//                         <th>Target Language</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {history.map((entry, index) => (
//                         <tr key={index}>
//                             <td>{new Date(entry.date).toLocaleString()}</td>
//                             <td>{entry.originalText}</td>
//                             <td>{entry.translatedText}</td>
//                             <td>{entry.sourceLanguage}</td>
//                             <td>{entry.targetLanguage}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export default TranslationHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function TranslationHistory({ user }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!user) return;

        axios.get(`http://localhost:5000/api/getTranslationHistory/${user.id}`)
            .then(response => setHistory(response.data))
            .catch(err => console.error('Error fetching history:', err));
    }, [user]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Translation History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Original Text</th>
                        <th>Translated Text</th>
                        <th>Source Language</th>
                        <th>Target Language</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index}>
                            <td>{new Date(entry.date).toLocaleString()}</td>
                            <td>{entry.originalText}</td>
                            <td>{entry.translatedText}</td>
                            <td>{entry.sourceLanguage}</td>
                            <td>{entry.targetLanguage}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TranslationHistory;
