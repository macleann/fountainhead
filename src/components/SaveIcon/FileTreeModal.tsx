import React, { useState, useEffect } from 'react';

interface FileTreeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthenticateClick: () => void;
}

interface FileItem {
    name: string;
    type: 'file' | 'folder';
    children?: FileItem[];
}

const initialFileTree: FileItem[] = [
    { name: 'authenticate.exe', type: 'file' },
    { 
        name: 'documents', 
        type: 'folder',
        children: [
            { name: 'note.txt', type: 'file' },
            { name: 'secret.pdf', type: 'file' },
        ]
    },
    { 
        name: 'images', 
        type: 'folder',
        children: [
            { name: 'photo1.jpg', type: 'file' },
            { name: 'photo2.jpg', type: 'file' },
        ]
    },
];

const FileTreeModal: React.FC<FileTreeModalProps> = ({ isOpen, onClose, onAuthenticateClick }) => {
    const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);
    const [selectedSubItem, setSelectedSubItem] = useState<FileItem | null>(null);
    const [isHorizontal, setIsHorizontal] = useState(window.innerWidth > window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setIsHorizontal(window.innerWidth > window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isOpen) return null;

    const handleItemClick = (item: FileItem) => {
        setSelectedItem(item);
        setSelectedSubItem(null);
        if (item.name === 'authenticate.exe') {
            onAuthenticateClick();
        }
    };

    const handleSubItemClick = (item: FileItem) => {
        setSelectedSubItem(item);
        if (item.name === 'authenticate.exe') {
            onAuthenticateClick();
        }
    };

    const renderItem = (item: FileItem) => {
        const prefix = item.type === 'folder' ? '> ' : '  ';
        return (
            <span>
                {prefix}{item.name}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black border border-white w-4/5 h-4/5 flex flex-col">
                <div className="bg-white px-2 py-1 flex justify-between items-center">
                    <span className="text-black text-sm">PLEASURE GARDEN</span>
                    <button onClick={onClose} className="text-black">
                        ✕
                    </button>
                </div>
                <div className={`flex-1 flex ${isHorizontal ? 'flex-row' : 'flex-col'} overflow-hidden text-white`}>
                    <div className={`${isHorizontal ? 'w-1/3 border-r' : 'flex-1'} border-white overflow-y-auto p-2`}>
                    {/* todo: fix the breadcrumb for mobile and column state bugs */}
                        {initialFileTree.map((item, index) => (
                            <div 
                                key={index}
                                className={`cursor-pointer ${selectedItem?.name === item.name ? 'bg-blue-500' : 'hover:bg-gray-700'} p-1`}
                                onClick={() => handleItemClick(item)}
                            >
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                    {isHorizontal && (
                        <>
                            <div className="w-1/3 border-r border-white overflow-y-auto p-2">
                                {selectedItem?.children?.map((item, index) => (
                                    <div 
                                        key={index}
                                        className={`cursor-pointer ${selectedSubItem?.name === item.name ? 'bg-blue-500' : 'hover:bg-gray-700'} p-1`}
                                        onClick={() => handleSubItemClick(item)}
                                    >
                                        {renderItem(item)}
                                    </div>
                                ))}
                            </div>
                            <div className="w-1/3 overflow-y-auto p-2">
                                {/* This column can be used for file preview or further nested content */}
                                {selectedSubItem && (
                                    <div>
                                        <h3 className="text-white mb-2">{selectedSubItem.name}</h3>
                                        <p className="text-gray-400">File preview or additional details could go here.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileTreeModal;