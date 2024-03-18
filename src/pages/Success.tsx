import '../../public/illustration.png'
import '../../public/icon_mapRounded.png';
import '../../public/icon_timer.png';
import '../../public/icon_money.png';
import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export function Success() {
  const { purchase } = useContext(ProductsContext)

  return (
    <div>
      <div className="max-w-7xl mx-auto h-screen mt-20 flex items-start justify-center gap-[102px]">
        <div>
          <div>
            <h1 className='font-extrabold text-yellowDark text-3xl '> Uhu! Pedido confirmado</h1> 
            <p>Agora é só aguardar que o café chegará até você</p>
          </div>

          <div className='max-w-[526px] py-10 px-10 flex flex-col items-start justify-center gap-9 border border-solid border-purple rounded-tr-[36px] rounded-bl-[36px]'>
            <div className='flex flex-col items-center justify-center gap-4'>
              {/* <div className='w-full gap-2 flex items-center'>
                <img src="icon_mapRounded.png" alt="" />
                <p className=''>
                  Entrega em {purchase?.street}
                </p>
              </div>  */}

              <div className='w-full gap-2 flex  items-center'>
                <img src="icon_timer.png" alt="" />
                <p className='text-base'>Previsão de entrega <span className='font-bold ' >20 min - 30 min</span> </p>
              </div>

              <div className='w-full gap-2 flex items-center'>
                <img src="icon_money.png" alt="" />
                <p className='text-base'>Pagamento na entrega <span className='font-bold ' >Cartão de Crédito</span> </p>
              </div>
            </div>
          </div>
        </div>

        <div >
          <img src="illustration.png" alt="" />
        </div>
      </div>
    </div>
  )
}