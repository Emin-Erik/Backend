import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";
import { dishOptions } from "./dishOptions";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDish: string;
  setSelectedDish: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleAddCard: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  selectedDish,
  setSelectedDish,
  handleAddCard,
}) => {
 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Gericht auswählen</ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-center">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[25rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Suche Gericht..."
              size="md"
              startContent={<SearchIcon width={24} height={24} />}
              type="search"
            />
          </div>
          <select
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          >
            {/* Map over the dishOptions array to generate option elements */}
            {dishOptions.map((dish, index) => (
              <option key={index} value={dish.name}>{dish.name}</option>
            ))}
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="light" onPress={onClose}>
            Abbrechen
          </Button>
          <Button color="primary" onPress={handleAddCard}>
            Hinzufügen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
