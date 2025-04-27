import type { Locale } from '@/types';
import type { Metadata } from 'next';

type MetadataType = {
  [key in Locale]: Metadata;
};

export const metadata: MetadataType = {
  en: {
    title: {
      default: 'Nicolas Ariel Fernandez - Expert Fullstack JavaScript Developer',
      template: '%s - Nicolas Ariel Fernandez - Expert Fullstack JavaScript Developer',
      absolute: 'Expert Fullstack JavaScript Developer',
    },
    keywords:
      'Fullstack Developer, JavaScript, React.js, Next.js, Node.js, TypeScript, NestJS, Docker, AWS, GitHub Actions, CI/CD, GraphQL, REST APIs, microservices, scalable architectures, cloud solutions, DevOps, TypeScript, AWS Lambda, MongoDB, PostgreSQL, MySQL, Tailwind CSS, Material UI, web development, software development, cloud-based services, B2 English, native Spanish',
    description:
      'Discover the portfolio of Nicolas Ariel Fernandez, a seasoned Fullstack Developer based in Neuquén, Argentina, with over 3 years of experience in web and software development. Specializing in JavaScript, React.js, Next.js, Node.js, NestJS, TypeScript, Docker, AWS, and cloud solutions. Expertise in scalable architectures, REST & GraphQL APIs, microservices, and DevOps automation. While based in Argentina, I am open to collaborating on remote projects. With a diverse background in hospitality across New Zealand, Sweden, Germany, and Australia, I bring strong problem-solving skills, adaptability, and team collaboration abilities.',
    openGraph: {
      title: {
        default: 'Nicolas Ariel Fernandez - Fullstack Developer',
        template: '%s - Nicolas Ariel Fernandez - Fullstack Developer',
        absolute: 'Fullstack Developer',
      },
      description:
        'Explore the portfolio of Nicolas Ariel Fernandez, a highly skilled Fullstack Developer specializing in JavaScript, React.js, Node.js, TypeScript, and cloud technologies. Offering expertise in building scalable applications, REST & GraphQL APIs, and DevOps automation practices.',
      url: 'https://nicolasfernandez.tech',
      siteName: 'Nicolas Ariel Fernandez Portfolio',
      images: [
        {
          url: 'https://nicolasfernandez.tech/images/profile-picture.jpeg',
          width: 1200,
          height: 630,
          alt: 'Nicolas Ariel Fernandez - Fullstack Developer',
          type: 'image/jpeg',
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: 'Nicolas Ariel Fernandez - Fullstack Developer',
        template: '%s - Nicolas Ariel Fernandez - Fullstack Developer',
        absolute: 'Fullstack Developer',
      },
      description:
        'Learn about Nicolas Ariel Fernandez, a Fullstack Developer with advanced skills in JavaScript, React.js, Node.js, Next.js, and cloud-based solutions. Explore his portfolio of projects and expertise in DevOps and scalable architecture.',
      images: ['https://nicolasfernandez.tech/images/profile-picture.jpeg'],
      creator: '@nicolasfernandez',
    },
    icons: {
      icon: 'favicon.ico',
      shortcut: 'favicon.ico',
      apple: 'favicon.ico',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Nicolas Ariel Fernandez - Expert Fullstack JavaScript Developer',
      startupImage: 'favicon.ico',
    },
  },
  es: {
    title: {
      default: 'Nicolas Ariel Fernandez - Desarrollador Fullstack JavaScript Experto',
      template: '%s - Nicolas Ariel Fernandez - Desarrollador Fullstack JavaScript Experto',
      absolute: 'Desarrollador Fullstack JavaScript Experto',
    },
    keywords:
      'Desarrollador Fullstack, JavaScript, React.js, Next.js, Node.js, TypeScript, NestJS, Docker, AWS, GitHub Actions, CI/CD, GraphQL, REST APIs, microservicios, arquitecturas escalables, soluciones en la nube, DevOps, TypeScript, AWS Lambda, MongoDB, PostgreSQL, MySQL, Tailwind CSS, Material UI, desarrollo web, desarrollo de software, servicios basados en la nube, ingles B2, español nativo',
    description:
      'Descubre el portafolio de Nicolas Ariel Fernandez, un experimentado Desarrollador Fullstack radicado en Neuquén, Argentina, con más de 3 años de experiencia en desarrollo web y de software. Especializado en JavaScript, React.js, Next.js, Node.js, NestJS, TypeScript, Docker, AWS y soluciones en la nube. Experto en arquitecturas escalables, APIs REST & GraphQL, microservicios y automatización DevOps. Aunque estoy basado en Argentina, estoy abierto a colaborar en proyectos remotos. Con una diversa experiencia en hospitalidad en Nueva Zelanda, Suecia, Alemania y Australia, aporto habilidades sólidas de resolución de problemas, adaptabilidad y colaboración en equipo.',
    openGraph: {
      title: {
        default: 'Nicolas Ariel Fernandez - Desarrollador Fullstack',
        template: '%s - Nicolas Ariel Fernandez - Desarrollador Fullstack',
        absolute: 'Desarrollador Fullstack',
      },
      description:
        'Explora el portafolio de Nicolas Ariel Fernandez, un Desarrollador Fullstack altamente capacitado, especializado en JavaScript, React.js, Node.js, TypeScript y tecnologías en la nube. Ofreciendo experiencia en la construcción de aplicaciones escalables, APIs REST & GraphQL y prácticas de automatización DevOps.',
      url: 'https://nicolasfernandez.tech',
      siteName: 'Portafolio de Nicolas Ariel Fernandez',
      images: [
        {
          url: 'https://nicolasfernandez.tech/images/profile-picture.jpeg',
          width: 1200,
          height: 630,
          alt: 'Nicolas Ariel Fernandez - Desarrollador Fullstack',
          type: 'image/jpeg',
        },
      ],
      locale: 'es-ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: 'Nicolas Ariel Fernandez - Desarrollador Fullstack',
        template: '%s - Nicolas Ariel Fernandez - Desarrollador Fullstack',
        absolute: 'Desarrollador Fullstack',
      },
      description:
        'Conoce a Nicolas Ariel Fernandez, un Desarrollador Fullstack con habilidades avanzadas en JavaScript, React.js, Node.js, Next.js y soluciones basadas en la nube. Explora su portafolio de proyectos y experiencia en DevOps y arquitectura escalable.',
      images: ['https://nicolasfernandez.tech/images/profile-picture.jpeg'],
      creator: '@nicolasfernandez',
    },
    icons: {
      icon: 'favicon.ico',
      shortcut: 'favicon.ico',
      apple: 'favicon.ico',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Nicolas Ariel Fernandez - Desarrollador Fullstack JavaScript Experto',
      startupImage: 'favicon.ico',
    },
  },
};
