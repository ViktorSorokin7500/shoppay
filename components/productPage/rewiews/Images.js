import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { MdOutlineRemoveCircle } from "react-icons/md";

export default function Images({ images, setImages }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (images.length > 3 || i == 2) {
        setError("Maximum 3 images a allowed");
        return;
      }
      if (
        !img.name.toLowerCase().endsWith(".jpeg") &&
        !img.name.toLowerCase().endsWith(".jpg") &&
        !img.type.includes("png") &&
        !img.type.includes("webp")
      ) {
        setError(
          `${img.name} format is unsuported, only JPG JPEG PNG WEBP are allowed`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large (max 5MB allowed)`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };
  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError("");
    }
  };
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png,image/jpeg,image/webp,image/jpg"
      />
      <button
        className={styles.login_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add images
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i} onClick={() => removeImage(img)}>
              <MdOutlineRemoveCircle />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
}
