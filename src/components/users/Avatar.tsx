import Image from "next/image";
import styles from "./Avatar.module.css";

export function Avatar({ name }: { name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(
          Math.random() * 30
        )}.png`}
        fill
        sizes="30"
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
  );
}
