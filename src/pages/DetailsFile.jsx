import React from 'react';
import { BsFiletypeDocx } from "react-icons/bs";
import { SiZaim } from "react-icons/si";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
export default function DetailsFile() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-full max-w-screen-lg">
        <div className="w-full lg:w-4/6 p-4">
          <div className="bg-white border rounded-lg flex flex-col lg:flex-row items-center justify-between p-10">
            <div className="flex items-center mb-4 lg:mb-0">
              <img src="/path/to/your/photo.jpg" alt="Document" className="h-20 w-20 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-bold">Nom du Document.pdf</h2>
                <p className="text-gray-500">Type de document</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 lg:mb-0 lg:mr-2">
                Télécharger
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/6  p-4">
          <div className="bg-white border  rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div className="border-b border-gray-400 opacity-50 mb-2"></div>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel vestibulum eros. Vestibulum nec mi non ligula lacinia vestibulum.</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/6 p-4">
          <div className="bg-white border  rounded-lg h-150 flex items-center justify-center">
          <div className="p-4 w-full">
          <h3 className="text-lg font-semibold mb-2">Détails du document</h3>
              <div className="border-b border-gray-400 opacity-50 mb-6"></div>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    
                  <div className="flex mb-4">
                    
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
               <BsFiletypeDocx/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg  border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
              </div>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <SiZaim/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Size" disabled/>
              </div>
                  </div>
                  <div className="mb-4">
                  <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <BsFillPersonVcardFill/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="La dernière mise à jour a été effectuée par" disabled/>
              </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
             <MdDateRange/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Créé à" disabled />
              </div><div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <MdDateRange/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="modifier à" disabled/>
              </div>
                  </div>
                  <div className="mb-4">
                  <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <IoLinkOutline/>
                </span>
                <input type="text" id="url" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL" disabled/>
              </div>
                  </div>
                  <div className="mb-4">
                  <textarea type="text" placeholder="Description" className="border p-2 rounded w-full"/>
                  </div>
                  <button type="button" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                    modifier
                  </button>
                </form>
                </div>
          </div>
        </div>
        <div className="w-full lg:w-2/6 p-4">
  <div className="bg-white border rounded-lg">
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Propriétaire du document</h3>
      <div className="border-b border-gray-400 opacity-50 mb-2"></div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="py-3 px-6">Nom</th>
                    <td className="py-4 px-6">Nazik</td>
                    
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="py-3 px-6"> Email</th>
                    <td className="py-4 px-6">nazik@gmail.com</td>
                  
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="py-3 px-6">téléphone</th>
                    <td className="py-4 px-6">0690817264</td>
                  
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="py-3 px-6">dernière connexion</th>
                    <td className="py-4 px-6">12/12/2001</td>
                   
                </tr>
                </tbody>
            </table>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
