# -*- coding: utf-8 -*-
import scrapy


class CompanySpider(scrapy.Spider):
    name = 'company'
    allowed_domains = ['www.merolagani.com']
    start_urls = ['http://www.merolagani.com/LatestMarket.aspx/']

    def parse(self, response):
        shares=response.xpath("//table[@class='table table-hover live-trading sortable']/tbody/tr/td/a")

        # yield{
        #     'name':shares
        # }
        for share in shares:
            name=share.xpath(".//text()").get()
            link=share.xpath(".//@href").get()
            absolute_url =response.urljoin(link)
            if (name and link):
                yield response.follow(url=link, callback=self.parse_share, meta ={'short':name})

    def parse_share(self,response):
        name = response.request.meta['short']
        cname=response.xpath("//span[@id='ctl00_ContentPlaceHolder1_CompanyDetail1_companyName']/text()").get()
        sector=response.xpath("//th[contains(text(),'Sector')]/following-sibling::td/text()").get()
        sharesout=response.xpath("//th[contains(text(),'Shares Outstanding')]/following-sibling::td/text()").get()
        low_high=response.xpath("//th[contains(text(),'52 Weeks High - Low')]/following-sibling::td/text()").get()
        avg_120=response.xpath("//th[contains(text(),'120 Day Average')]/following-sibling::td/text()").get()
        yield_year=response.xpath("//th[contains(text(),'1 Year Yield')]/following-sibling::td/span/text()").get()
        eps=response.xpath("//th[contains(text(),'EPS')]/following-sibling::td/text()").get()
        epsyq=response.xpath("//th[contains(text(),'EPS')]/following-sibling::td/span/text()").get()
        pe=response.xpath("//th[contains(text(),'P/E Ratio')]/following-sibling::td/text()").get()
        book_value=response.xpath("//th[contains(text(),'Book Value')]/following-sibling::td/text()").get()
        pbv=response.xpath("//th[contains(text(),'PBV')]/following-sibling::td/text()").get()
        dividend=response.xpath("//th//a[contains(text(),'% Dividend')]/parent::th/following-sibling::td/text()").get()
        dividendy=response.xpath("//th//a[contains(text(),'% Dividend')]/parent::th/following-sibling::td/span/text()").get()
        bonus=response.xpath("//th//a[contains(text(),'% Bonus')]/parent::th/following-sibling::td/text()").get()
        bonusy=response.xpath("//th//a[contains(text(),'% Bonus')]/parent::th/following-sibling::td/span/text()").get()
        right=response.xpath("//th//a[contains(text(),'Right Share')]/parent::th/following-sibling::td/text()").get()
        righty=response.xpath("//th//a[contains(text(),'Right Share')]/parent::th/following-sibling::td/span/text()").get()
        avg=response.xpath("//th[contains(text(),'30-Day Avg Volume')]/following-sibling::td/text()").get()
        market=response.xpath("//th[contains(text(),'Market Capitalization')]/following-sibling::td/text()").get()

     



        yield{
            'short':name,
            'cname':cname,
            'sector':sector.strip(),
            'sharesout':sharesout.strip(),
            'low_high':low_high.strip(),
            'avg_120':avg_120.strip(),
            'yield_year':yield_year,
            'eps':eps.strip() + epsyq.strip(),
            'pe':pe.strip(),
            'book_value':book_value.strip(),
            'pbv':pbv.strip(),
            'dividend':dividend.strip()+dividendy.strip(),
            'bonus':bonus.strip()+bonusy.strip(),
            'right':right.strip()+righty.strip(),
            'avg':avg.strip(),
            'market':market.strip()



            


        }
