"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Typography, Stack } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
          Welcome to GLER Waitlist Demo
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Explore the Service Providers table with filters and search.
        </Typography>

        <Stack direction="row" spacing={2} className={styles.ctas}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/waitlist")}
          >
            Go to Waitlist
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Next.js Docs
          </Button>
        </Stack>
      </main>
    </div>
  );
}
