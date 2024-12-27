import React from 'react';
import Select from 'react-select';
interface FileWithStatus {
  file: File;
  approved: boolean;
  primary: boolean;
}

function VariationImageDropdown({ approvedImages, value, handleVariationValueChange, index }: { approvedImages: FileWithStatus[], value: any, handleVariationValueChange: Function, index: number }) {
  // Transform images into options compatible with react-select
  const options = approvedImages.map((img) => ({
    value: img.file.name,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={URL.createObjectURL(img.file)}
          alt="Option"
          className="h-10 w-10 object-cover"
        />
        <span>{img.file.name}</span>
      </div>
    ),
    image: img, // Keep a reference to the full image object
  }));

  // Find the currently selected option
  const selectedOption = value.image
    ? options.find((option) => option.value === value.image.file.name)
    : null;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(selectedOption: any) => {
        const selectedImage = selectedOption?.image ?? null;
        handleVariationValueChange(index, "image", selectedImage);
      }}
      placeholder="Select an image"
      isClearable
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

export default VariationImageDropdown;
