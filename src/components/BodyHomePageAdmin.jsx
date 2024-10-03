import "../input.css";
import { Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";

const BodyHomePageAdmin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [songsData, setSongsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://website-lirik-c51g.vercel.app/api/songsWithArtist");
                const data = await response.json();
                setSongsData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching songs data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/songs?search=${searchTerm}`);
        } else {
            alert("Silakan masukkan judul lagu.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Action',
                accessor: (row) => (
                    <div className="flex space-x-2 justify-center"> {/* Flexbox untuk merapikan tombol */}
                    <button
                        onClick={() => navigate(`/editLagu/${row.songId}`)}
                        className="bg-custom-blue-seas text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => navigate(`/lagu/${row.songId}`)} // Ubah URL untuk detail
                        className="bg-custom-blue-seas text-white px-4 py2 rounded hover:bg-blue-600"
                    >
                        Detail
                    </button>
                    </div>
                ),
            },
            {
                Header: 'Title',
                accessor: 'songsName',
            },
            {
                Header: 'Artist',
                accessor: 'artist.artistName',
            },
            {
                Header: 'Lyrics',
                accessor: (row) => row.lirik.length > 20 ? row.lirik.slice(0, 20) + "..." : row.lirik,
            },
            {
                Header: 'Link',
                accessor: (row) => (
                <a
                    href={row.songsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {row.songsLink.length > 20 ? row.songsLink.slice(0, 20) + "..." : row.songsLink}
                </a>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data: songsData,
            initialState: { pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state: { pageIndex },
        nextPage,
        previousPage,
        gotoPage,
        setPageSize,
    } = tableInstance;

    const handleEdit = (songId) => {
        navigate(`/editLagu/${songId}`);
    };

    const handleAddSong = () => {
        navigate("/addLagu"); // Ganti dengan rute yang benar untuk menambahkan lagu
    };

    return (
        <div className="text-black pt-5 pb-10">
            <div className="grid grid-cols-8 gap-4 p-10 justify-center">
                <div className="col-span-2 flex items-center">
                    <h1 className="text-2xl font-bold text-custom-black">Songs</h1>
                </div>

                <div className="col-span-3"></div>

                {/* Input box and search button */}
                <div className="col-span-3 items-center">
                    <div className="relative mt-4 shadow-xl">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Ketik judul atau lirik lagu yang ingin dicari.."
                            className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button
                                onClick={handleSearch}
                                className="text-custom-black font-bold p-2 bg-custom-blue-white rounded-lg hover:bg-gray-300"
                            >
                                <Search />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-10 py-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            {/* Add Song button at the start */}
                            <button
                                onClick={handleAddSong}
                                className="bg-custom-blue-seas text-white px-4 py-2 rounded"
                            >
                                Add Song
                            </button>

                            {/* Dropdown to select page size */}
                            <div className="flex items-center">
                                <span className="mr-2">Show:</span>
                                <select
                                    className="px-2 py-1 border border-gray-300 rounded bg-custom-blue-white"
                                    value={tableInstance.state.pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                >
                                    {[5, 10, 20].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <table {...getTableProps()} className="min-w-full bg-custom-blue-white rounded-md">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="py-2 cursor-pointer"
                                            >
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="text-center">
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} className="py-2">
                                                    {cell.render("Cell")}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="pagination flex justify-between mt-4">
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="bg-custom-blue-seas text-white px-4 py-1 rounded hover:bg-gray-400"
                            >
                                Previous
                            </button>
                            <span>
                                Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                            </span>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="bg-custom-blue-seas text-white px-4 py-1 rounded hover:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BodyHomePageAdmin;
