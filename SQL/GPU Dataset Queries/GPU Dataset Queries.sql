/*   Machine Problem in CMSC 127
 *   Submitted by: John Eron David D. Salongsongan
 *   Dataset: https://www.kaggle.com/datasets/alanjo/graphics-card-full-specs
 *   Schema Name: machineproblem
 *   Table Name: gpulist 
 */

/*   Random Facts (Query included):
 */

/*   There are 8 distinct GPU manufacturers in the dataset:
 *   NVIDIA, Intel, AMD, Sony, XGI, Matrox, ATI, and 3dfx.
 */
select distinct g.manufacturer 
from machineproblem.gpulist g; 

/*   Among the 8 manufacturers, NVIDIA released the most GPUs, with
 * 	 1,272 GPUs. The next largest, in terms of release numbers, is 
 *   AMD, with 755 releases. On the other hand, Sony released the least, with
 *   9 GPUs released 
 */
select distinct g.manufacturer, count(*)
from machineproblem.gpulist g 
group by g.manufacturer 
order by count desc;

/*   There are 2,585 distinct GPUs in the dataset. 
 */
select count(distinct g.productname) 
from machineproblem.gpulist g;

/*    The top 5 years with the most released GPU are: 1. 2013 (225), 2. 2008 (174),
 * 	  3. 2012 (173), 4. 2011 (170), 5. 2015 (165). On the other hand, the top 5 years
 *    with the least amount of released GPU are: 1-2. 1994 and 2023 (1 each), 3-5. 1986,
 * 	  1988, and 1990 (2 each). 
 */
select g.releaseyear, count(*)  
from machineproblem.gpulist g 
group by g.releaseyear
order by count desc; 

/*    Grouping the years by 5, the year range with the most released GPU is 2010-2014 (865),
 * 	  while the year range with the least released GPU is 1985-1989 (7). 
 */
select (g.releaseyear/5)*5 || '-' || (g.releaseyear/5)*5+4 as "releaseyear", count(*) 
from machineproblem.gpulist g
group by g.releaseyear/5
order by count desc;

/*   Across 2010-2014, the years with the most released GPUs according to the previous
 *   query, NVIDIA released the most GPUs, with 379 GPUs. On the other hand, Sony released
 *   the least in this span of 5 years, with 1 release.
 */
select releases.manufacturer, releases.count
from (
	select (g.releaseyear/5)*5 || '-' || (g.releaseyear/5)*5+4 as "releaseyear", g.manufacturer, count(*) 
	from machineproblem.gpulist g
	group by g.releaseyear/5, g.manufacturer
) as releases
where releases.releaseyear = '2010-2014'
group by releases.manufacturer, releases.count
order by releases.count desc;

/*   Before the year 2000, 6 of the 8 listed manufacturers in the dataset released a GPU. Out of the 6,
 * 	 ATI released the most with 65 GPUs released before the turn of the millenia.
 */
select g.manufacturer, count(*) 
from machineproblem.gpulist g 
where g.releaseyear < 2000
group by g.manufacturer 
order by count desc;

/*   After the turn of millenia, starting from the year 2000 until the latest year in the dataset, 2023, 
 *   NVIDIA released the most GPUs, with 1,249 GPUs.
 */
select g.manufacturer, count(*) 
from machineproblem.gpulist g 
where g.releaseyear > 1999
group by g.manufacturer 
order by count desc;

/*   The average memory size of GPUs in the dataset is approximately 3.11GB.
 */
select avg(g.memsize) 
from machineproblem.gpulist g;

/*   There are 44 distinct memory sizes used in GPUs in the dataset.
 */
select count(distinct g.memsize) 
from machineproblem.gpulist g;

/*   The manufacturer that released GPUs with the highest average memory size 
 *   is Intel, with an average of, approximately 8.64GB, of memory size
 */
select g.manufacturer, avg(g.memsize) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc;

/*   The average memory size of GPUs from 1980 to 1989 is approximately 169.14KB.
 *   The average memory size of GPUs from 1990 to 1999 is approximately 11.91MB.  
 *   The average memory size of GPUs from 2000 to 2009 is approximately 0.35GB. 
 *   The average memory size of GPUs from 2010 to 2019 is approximately 3.74GB.
 *   The average memory size of GPUs from 2020 to Present is approximately 14.21GB.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.memsize)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.memsize)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common memory size, that is specified, of GPUs is 1.024GB, with 412 GPUs having this memory size.
 */
select g.memsize, count(*) 
from machineproblem.gpulist g
where g.memsize is not null
group by g.memsize 
order by count desc; 

/*   The average memory bus width of GPUs in the dataset is approximately 275 bits.
 */
select avg(g.membuswidth) 
from machineproblem.gpulist g;

/*   The manufacturer that released GPUs with the highest average memory bus width 
 *   is Sony, with an average of, approximately, 1,266 bits of bus width.
 */
select g.manufacturer, avg(g.membuswidth) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc;

/*   The average memory bus width of GPUs from 1980 to 1989 is 32 bits.
 *   The average memory bus width of GPUs from 1990 to 1999 is approximately 86 bits.  
 *   The average memory bus width of GPUs from 2000 to 2009 is approximately 173 bits. 
 *   The average memory bus width of GPUs from 2010 to 2019 is approximately 299 bits.
 *   The average memory bus width of GPUs from 2020 to Present is approximately 701 bits.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.membuswidth)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.membuswidth)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common memory bus width of GPUs is 128 bits, with 929 GPUs having this bus width.
 */
select g.membuswidth, count(*) 
from machineproblem.gpulist g 
group by g.membuswidth 
order by count desc; 

/*   The average GPU clock speed of GPUs in the dataset is approximately 661.13 MHz.
 */
select avg(g.gpuclock) 
from machineproblem.gpulist g;

/*   The manufacturer that released GPUs with the highest average GPU clock speed 
 *   is AMD, with an average of, approximately, 862.04 MHz.
 */
select g.manufacturer, avg(g.gpuclock) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc;

/*   The average GPU clock speed of GPUs from 1980 to 1989 is approximately 12.14 MHz.
 *   The average GPU clock speed of GPUs from 1990 to 1999 is approximately 82.95 MHz.  
 *   The average GPU clock speed of GPUs from 2000 to 2009 is approximately 430.72 MHz. 
 *   The average GPU clock speed of GPUs from 2010 to 2019 is approximately 801.88 MHz.
 *   The average GPU clock speed of GPUs from 2020 to Present is approximately 1,106.17 MHz.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.gpuclock)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.gpuclock)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common GPU clock speed of GPUs is 300 MHz, with 146 GPUs having this GPU clock speed.
 */
select g.gpuclock, count(*) 
from machineproblem.gpulist g 
group by g.gpuclock 
order by count desc; 

/*   The average memory clock speed of GPUs in the dataset is approximately 868.58 MHz.
 */
select avg(g.memclock) 
from machineproblem.gpulist g;

/*   The manufacturer that released GPUs with the highest average memory clock speed 
 *   is Intel, with an average of 1,325.32 MHz.
 */
select g.manufacturer, avg(g.memclock) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc;

/*   The average memory clock speed of GPUs from 1980 to 1989 is 7 MHz.
 *   The average memory clock speed of GPUs from 1990 to 1999 is approximately 92.55 MHz.  
 *   The average memory clock speed of GPUs from 2000 to 2009 is approximately 476.55 MHz. 
 *   The average memory clock speed of GPUs from 2010 to 2019 is approximately 1,118.58 MHz.
 *   The average memory clock speed of GPUs from 2020 to Present is approximately 1,620.97 MHz.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.memclock)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.memclock)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common memory clock speed of GPUs, that is specified, is 900 MHz, with 206 GPUs having
 *   this memory clock speed.
 */
select g.memclock, count(*) 
from machineproblem.gpulist g 
where g.memclock is not null
group by g.memclock  
order by count desc; 

/*   Data pertaining to unified shaders started to appear in the year 2005.
 *   The average unified shaders from 2005 to 2009 is approximately 154.43.
 *   The average unified shaders from 2010 to 2014 is approximately 565.7.
 *   The average unified shaders from 2015 to 2019 is approximately 1,327.05.
 *   The average unified shaders from 2020 to Present is approximately 3,343.83.  
 */
select (g.releaseyear/5)*5 || '-' || (g.releaseyear/5)*5+4 as "Release Year", avg(g.unifiedshader)
from machineproblem.gpulist g
where g.releaseyear < 2020  
group by g.releaseyear/5 
union 
select (g.releaseyear/5)*5 || '-Present' as "Release Year", avg(g.unifiedshader)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/5
order by avg asc;

/*   The most common unified shaders count of GPUs, that is specified, is 384, with 206 GPUs having
 *   this number of unified shaders.
 */
select g.unifiedshader , count(*) 
from machineproblem.gpulist g 
where g.unifiedshader is not null 
group by g.unifiedshader  
order by count desc; 

/*   The average number of Texture Mapping Units (abbreviated to TMUs) in the GPUs in the dataset
 *   is approximately 47.42.
 */
select avg(g.tmu)
from machineproblem.gpulist g;

/*   The manufacturer that released the GPUs with the highest average number of TMUs is AMD, with
 *   an average of, approximately, 66.88 units in their GPUs.
 */
select g.manufacturer, avg(g.tmu) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc; 

/*   Based on the dataset, TMUs was not present to GPUs until the '90s.
 *   The average number of TMUs of GPUs from 1990 to 1999 is approximately 1.27 units.  
 *   The average number of TMUs of GPUs from 2000 to 2009 is approximately 12.62 units. 
 *   The average number of TMUs of GPUs from 2010 to 2019 is approximately 59.05 units.
 *   The average number of TMUs of GPUs from 2020 to Present is approximately 152.62 units.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.tmu)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.tmu)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common TMU count of GPUs, that is specified, is 8, with 415 GPUs having
 *   this number of TMUs.
 */
select g.tmu , count(*) 
from machineproblem.gpulist g 
where g.tmu is not null 
group by g.tmu  
order by count desc; 

/*   The average number of Render Output Units (abbreviated to ROPs) in the GPUs in the dataset
 *   is approximately 18.75.
 */
select avg(g.rop)
from machineproblem.gpulist g;

/*   The manufacturer that released the GPUs with the highest average number of ROPs is NVIDIA, with
 *   an average of, approximately, 24.76 units in their GPUs. AMD comes close at second with an average
 *   of approximately 21.99 units.
 */
select g.manufacturer, avg(g.rop) 
from machineproblem.gpulist g 
group by g.manufacturer 
order by avg desc; 

/*   The average number of ROPs of GPUs from 1980 to 1989 is approximately 0.57 units.
 *   The average number of ROPs of GPUs from 1990 to 1999 is approximately 1.36 units.  
 *   The average number of ROPs of GPUs from 2000 to 2009 is approximately 7.30 units. 
 *   The average number of ROPs of GPUs from 2010 to 2019 is approximately 21.92 units.
 *   The average number of ROPs of GPUs from 2020 to Present is approximately 58.15 units.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as "Release Year", avg(g.rop)
from machineproblem.gpulist g
where g.releaseyear < 2020
group by g.releaseyear/10
union 
select (g.releaseyear/10)*10 || '-Present' as "Release Year", avg(g.rop)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10
order by avg asc;

/*   The most common TMU count of GPUs, that is specified, is 4, with 662 GPUs having
 *   this number of TMUs.
 */
select g.rop , count(*) 
from machineproblem.gpulist g 
where g.rop is not null 
group by g.rop  
order by count desc;

/*   Data pertaining to pixel shaders and vertex shaders does not appear in the year 2015 onwards.
 *   The average pixel shaders from 1985 to 1989 is approximately 0.57.
 *   The average vertex shaders from the same period is 0.
 *   The average pixel shaders from 1990 to 1994 is approximately 1.07.
 *   The average vertex shaders from the same period is approximately 0.07.
 *   The average pixel shaders from 1995 to 1999 is approximately 1.51.
 *   The average vertex shaders from the same period is approximately 0.13.
 *   The average pixel shaders from 2000 to 2004 is approximately 4.65.
 *   The average vertex shaders from the same period is approximately 2.11.
 *   The average pixel shaders from 2005 to 2009 is approximately 11.35.
 *   The average vertex shaders from the same period is approximately 4.21.
 *   The average pixel shaders from 1985 to 1989 is 20.5.
 *   The average vertex shaders from the same period is 8. 
 */
select (g.releaseyear/5)*5 || '-' || (g.releaseyear/5)*5+4 as "Release Year", avg(g.pixelshader) as avgps, avg(g.vertexshader) as avgvs
from machineproblem.gpulist g
where g.releaseyear < 2020  
group by g.releaseyear/5 
union 
select (g.releaseyear/5)*5 || '-Present' as "Release Year", avg(g.pixelshader), avg(g.vertexshader)
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/5
order by avgps asc;

/*   The most common pixel shaders count of GPUs, that is specified, is 4, with 287 GPUs having
 *   this number of pixel shaders.
 */
select g.pixelshader, count(*) 
from machineproblem.gpulist g 
where g.pixelshader  is not null 
group by g.pixelshader  
order by count desc; 

/*   The most common vertex shaders count of GPUs, that is specified and nonzero, is 2, with 189 GPUs
 *   having this number of vertex shaders. Adding to this, it is more common to have no vertex shaders
 *   as according to the dataset, there are 208 GPUs that has 0 vertex shaders.
 */
select g.vertexshader  , count(*) 
from machineproblem.gpulist g 
where g.vertexshader  is not null 
group by g.vertexshader  
order by count desc; 

/*   Having no Integrated Graphics Processor (IGP) is more common than having one. In the dataset, there are
 *   2,477 GPUs that do not have an IGP, and 412 GPUs that have IGP.
 */
select g.igp, count(*) 
from machineproblem.gpulist g
group by g.igp 
order by count desc; 

/*   Among those 412 GPUs that have IGP, AMD and Intel released most of them. The each released 147 GPUs that have
 *   IGP. 
 */
select g.manufacturer, count(*) 
from machineproblem.gpulist g 
where g.igp like 'Yes'
group by g.manufacturer 
order by count desc; 

/*   The three most common bus interfaces are the following: PCIe 2.0 x16 (563 GPUs), PCIe 3.0 x16 (498 GPUs), and
 *   PCIe 1.0 x16 (336 GPUs).
 */
select g.bus, count(*) 
from machineproblem.gpulist g
group by g.bus
order by count desc; 

/*   There are 30 distinct bus interfaces that is used in GPUs in the dataset.
 */
select count(distinct g.bus) 
from machineproblem.gpulist g; 

/*   From 1980 to 1989, the only bus interface on GPUs is PCI, which the 7 GPUs from this period have.
 *   From 1990 to 1999, PCI is still the most common bus, with 49 GPUs having this as the bus interface.
 *   From 2000 to 2009, PCIe 1.0 x16 is the most common type, with 324 GPUs having this.
 *   From 2010 to 2019, PCIe 3.0 x16 is the most common, with 453 GPUs having this.
 *   From 2020 to Present, PCIe 4.0 x16 is the most common, with 99 GPUs having this bus interface.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as years, g.bus as interface, count(*) 
from machineproblem.gpulist g 
where g.releaseyear < 2020
group by g.releaseyear/10, g.bus
union
select (g.releaseyear/10)*10 || '-Present', g.bus, count(*) 
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10, g.bus
order by years asc, count desc;

/*   The three most common memory types are the following: GDDR5 (724 GPUs), GDDR3 (471 GPUs), and
 *   System Shared (412 GPUs).
 */
select g.memtype, count(*) 
from machineproblem.gpulist g
group by g.memtype 
order by count desc; 

/*   There are 27 distinct memory types that is used in GPUs in the dataset.
 */
select count(distinct g.memtype) 
from machineproblem.gpulist g; 

/*   From 1980 to 1989, the only memory type on GPUs is DRAM, which the 7 GPUs from this period have.
 *   From 1990 to 1999, SDR is the most common type, with 61 GPUs having this as the memory type.
 *   From 2000 to 2009, GDDR3 is the most common type, with 372 GPUs having this.
 *   From 2010 to 2019, GDDR5 is the most common, with 680 GPUs having this.
 *   From 2020 to Present, GDDR6 is the most common, with 144 GPUs having this memory type.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as years, g.memtype as type, count(*) 
from machineproblem.gpulist g 
where g.releaseyear < 2020
group by g.releaseyear/10, g.memtype
union
select (g.releaseyear/10)*10 || '-Present', g.memtype, count(*) 
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10, g.memtype
order by years asc, count desc;

/*   The three most common GPU chips are the following: GK104 (51 GPUs), GK107 (48 GPUs), and
 *   GF108 (35 GPUs).
 */
select g.gpuchip, count(*) 
from machineproblem.gpulist g
group by g.gpuchip 
order by count desc; 

/*   There are 474 distinct GPU chips that is used in GPUs in the dataset.
 */
select count(distinct g.gpuchip) 
from machineproblem.gpulist g; 

/*   From 1980 to 1989, the most common GPU chip on GPUs is 16899-0, with 3 GPUs from this period have.
 *   From 1990 to 1999, Rage 4 is the most common GPU chip, with 12 GPUs having this as the GPU chip.
 *   From 2000 to 2009, G92 is the most common type, with 27 GPUs having this.
 *   From 2010 to 2019, GK104 is the most common, with 51 GPUs having this.
 *   From 2020 to Present, GA104 is the most common, with 18 GPUs having this GPU chip.
 */
select (g.releaseyear/10)*10 || '-' || (g.releaseyear/10)*10+9 as years, g.gpuchip as chip, count(*) 
from machineproblem.gpulist g 
where g.releaseyear < 2020
group by g.releaseyear/10, g.gpuchip 
union
select (g.releaseyear/10)*10 || '-Present', g.gpuchip, count(*) 
from machineproblem.gpulist g
where g.releaseyear > 2019
group by g.releaseyear/10, g.gpuchip
order by years asc, count desc;

/*   Conclusion:
 *   Since this is just a list of GPUs and its specs, we cannot give conclusion on its performance on use, as
 *   it is not a performance benchmark dataset. Instead, we can conclude on different aspects. First, we can 
 *   conclude that NVIDIA dominates the market, at least by number of releases across the years. They released 
 *   about 44% of the GPUs on the dataset. AMD is next with 26%. We can also conclude that the GPUs became more
 *   and more capable across the years, as shown by the increase in average numbers of memory size, memory bus width,
 *   GPU clock speed, memory clock speed, texture mapping units, and render output units. The averages of these 
 *   properties back in the 80s were very miniscule compared  to what the averages today. For example, the average 
 *   memory size in the 80s were only 0.00119% of the average memory size today and the average memory bus width in the
 *   80s were only 4.57% of the average today. This pattern of the averages in the 80s being just a fraction of
 *   the averages today were also shown in the other properties. Lastly, another conclusion that we can make is that there
 *   are changes in technology across time, which is expected. This is shown in the shift from using vertex and pixel
 *   shaders into unified shaders, as shown by the lack of data regarding vertex and pixel shaders in the year 2015 onwards
 *   and data about unified shaders only starting to appear from 2005 onwards. We can conclude here that the years 2005 to
 *   2015 was some sort of "transitional" years from vertex and pixel shaders to unified shaders. Another shift is the use
 *   of texture mapping units in the 90s, as shown by the data only showing up from the 90s onwards. Shift in technology is
 *   also shown in the change in what bus interface, memory type, and GPU chip are used decade by decade. In summary,
 *   using the variables in the dataset, we can conclude who is the biggest GPU manufacturer by number of releases, which is
 *   NVIDIA. We also conclude that there have been an steady and fast increase in the GPU properties like memory size, memory 
 *   bus width, etc. Lastly, we can also conclude that there have been some shift in the technology or components used
 *   in making GPUs.
 */
