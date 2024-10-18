import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PackageJson } from "./types";

interface RepositoryItemProps {
  file: PackageJson;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}
export const RepositoryItem: React.FC<RepositoryItemProps> = ({ file, onDelete, isSelected, onSelect }) => {
  return (
    <div
    className={`flex flex-row items-center justify-between p-2 rounded-md cursor-pointer ${isSelected ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
    onClick={onSelect}
    >
      <i className="ri-git-repository-line text-lg"></i>
      <span className="text-[0.8rem] ml-1.5">{file.name}</span>
      <div className="flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted-foreground/10 border border-muted-foreground/20">
            <i className="ri-more-fill"></i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onDelete(file.id)}>
            <i className="ri-delete-bin-line text-red-500"></i>
            <span className="text-sm">Delete</span>
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}