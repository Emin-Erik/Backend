import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

export default function SkeletonNav() {
  return (
    <Navbar>
      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <a href='/'>
          <Skeleton className='flex rounded-full w-12 h-12' />
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex' justify='center'>
        <NavbarBrand>
        <Skeleton className='flex rounded-full w-12 h-12' />
        </NavbarBrand>
        <NavbarItem className='pl-12 flex sm:mr-4 small2:ml-2 mid2:ml-8 mid3:ml-12 md:mr-2 mid4:ml-12 mid4:mr-4 mid5:ml-14 mid5:mr-10 prelarge:ml-16 lg:ml-20'>
          <Skeleton className='rounded-full w-8 h-8' />
          <Skeleton className="h-3 w-24 rounded-lg ml-2 mt-2"/>
        </NavbarItem>
        <NavbarItem isActive className='ml-4 flex sm:mr-6 sm:pl-4 md:ml-2'>
        <Skeleton className=' ml-12 rounded-full w-8 h-8' />
        <Skeleton className="h-3 w-24 rounded-lg ml-2 mt-2"/>
        </NavbarItem>
        <NavbarItem className='flex sm:ml-2 small2:ml-4 mid2:ml-2 md:ml-2 mid3:ml-2 prelarge:mr-4 mid4:mr-2'>
        <Skeleton className=' ml-16 rounded-full w-8 h-8' />
        <Skeleton className="h-3 w-24 rounded-lg ml-2 mt-2"/>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='sm:ml-2'>
          <Skeleton className='flex rounded-full w-12 h-12' />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
