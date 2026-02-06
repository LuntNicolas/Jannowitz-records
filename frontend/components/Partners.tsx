import React from 'react'
import {PartnerQueryResult} from '@/sanity/types'
import Image from 'next/image';
import {urlFor} from "@/sanity/image";

interface Props {
    partners: PartnerQueryResult
}

const Partners = ({partners}: Props) => {
    const width = 200;
    const height = 200;

    return (
        <section className="mb-20 relative">

            <div className="flex justify-center md:justify-between md:ml-10 mb-5 items-center">
                <h1 className="text-white md:text-3xl text-xl">Our Partners</h1>
            </div>

            <div className="marquee h-52">
                <div className="gradient-edge"/>
                <div className="gradient-edge"/>
                <div className="marquee-box md:gap-20 gap-10">
                    {partners.map((partner) => (
                        partner.logo ? (
                            <Image
                                key={partner._id}
                                src={urlFor(partner.logo).width(width).height(height).url()}
                                alt={partner._id}
                                width={width}
                                height={height}
                                className="bg-white size-20 md:size-30"
                            />
                        ) : (
                            <div>No Image</div>
                        )
                    ))}

                    {partners.map((partner) => (
                        partner.logo ? (
                            <Image
                                key={partner._id}
                                src={urlFor(partner.logo).width(width).height(height).url()}
                                alt={partner._id}
                                width={width}
                                height={height}
                            />
                        ) : (
                            <div>No Image</div>
                        )
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Partners
