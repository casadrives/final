import React from 'react';
import { FileIcon, ImageIcon, FileTextIcon, FileVideoIcon, MoreVertical } from 'lucide-react';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  shared: boolean;
}

const demoFiles: File[] = [
  {
    id: '1',
    name: 'Project Presentation.pptx',
    type: 'presentation',
    size: '2.4 MB',
    modified: '2024-03-15',
    shared: true,
  },
  {
    id: '2',
    name: 'Vacation Photos',
    type: 'folder',
    size: '1.2 GB',
    modified: '2024-03-14',
    shared: false,
  },
  {
    id: '3',
    name: 'Financial Report Q1.xlsx',
    type: 'spreadsheet',
    size: '856 KB',
    modified: '2024-03-13',
    shared: true,
  },
  {
    id: '4',
    name: 'Meeting Recording.mp4',
    type: 'video',
    size: '234 MB',
    modified: '2024-03-12',
    shared: false,
  },
];

function FileList({ searchQuery }: { searchQuery: string }) {
  const filteredFiles = demoFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredFiles.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}

function FileRow({ file }: { file: File }) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <FileIcon className="h-5 w-5 text-gray-400" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <FileVideoIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <FileTextIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-center px-6 py-4 hover:bg-gray-50">
      <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
        <p className="text-sm text-gray-500">
          {file.size} • Modified {file.modified}
        </p>
      </div>
      <div className="ml-4 flex items-center space-x-4">
        {file.shared && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Shared
          </span>
        )}
        <button className="p-1 rounded-full hover:bg-gray-100">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default FileList;