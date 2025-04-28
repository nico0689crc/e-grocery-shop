import type { Locale } from '@/types';
import type { Metadata } from 'next';

type MetadataType = {
  [key in Locale]: Metadata;
};

export const metadata: MetadataType = {
  en: {
    title: 'Home',
    description:
      'Discover the portfolio of Nicolas Ariel Fernandez, a seasoned Fullstack Developer based in Neuquén, Argentina, with over 3 years of experience in web and software development. Specializing in JavaScript, React.js, Next.js, Node.js, NestJS, TypeScript, Docker, AWS, and cloud solutions. Expertise in scalable architectures, REST & GraphQL APIs, microservices, and DevOps automation. While based in Argentina, I am open to collaborating on remote projects. With a diverse background in hospitality across New Zealand, Sweden, Germany, and Australia, I bring strong problem-solving skills, adaptability, and team collaboration abilities.',
  },
  es: {
    title: 'Inicio',
    description:
      'Descubre el portafolio de Nicolas Ariel Fernandez, un experimentado desarrollador Fullstack con sede en Neuquén, Argentina, con más de 3 años de experiencia en desarrollo web y de software. Especializado en JavaScript, React.js, Next.js, Node.js, NestJS, TypeScript, Docker, AWS y soluciones en la nube. Experto en arquitecturas escalables, APIs REST y GraphQL, microservicios y automatización DevOps. Aunque estoy basado en Argentina, estoy abierto a colaborar en proyectos remotos. Con una diversa trayectoria en hospitalidad en Nueva Zelanda, Suecia, Alemania y Australia, aporto sólidas habilidades para resolver problemas, adaptabilidad y capacidad de trabajo en equipo.',
  },
};
