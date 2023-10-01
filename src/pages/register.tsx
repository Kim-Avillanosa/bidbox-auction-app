import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Page } from '@/shared/components';
import LoginForm from '@/shared/auth/LoginForm';
import RegistrationForm from '@/shared/auth/RegistrationForm';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Page title='BidBox'>
      <Layout>
        <RegistrationForm />
      </Layout>
    </Page>
  )
}
