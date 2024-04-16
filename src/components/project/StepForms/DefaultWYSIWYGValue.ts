import { ProjectData } from "types";
import { ethers } from "ethers";
import moment from "moment";

const DEFAULT_CONTENT = `<p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="/Fundflow-LightBG.svg" alt="TinyMCE Logo" width="128" height="128"></p>
<h2 style="text-align: center;">Welcome to the FundFlow!</h2>
<h5 style="text-align: center;">This demo includes <em>enterprise</em>, also known as <em>Premium</em> features.</h5>
<h5 style="text-align: center;">Try out these features as provided in this full featured example.</h5>
<h5 style="text-align: center;">And visit the <a href="../pricing" aria-invalid="true">pricing page</a> to learn more about our Premium plugins.</h5>
<h2>Got questions or need help?</h2>
<ul>
<li>Our <a class="mceNonEditable" href="../7/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
<li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
<li>We also offer enterprise grade support as part of <a href="../pricing" aria-invalid="true">TinyMCE premium subscriptions</a>.</li>
</ul>
<h2>A simple table to play with</h2>
<table style="border-collapse: collapse; width: 100%;" border="1">
<thead>
<tr style="text-align: left;">
<th>Product</th>
<th>Cost</th>
<th>Really?</th>
</tr>
</thead>
<tbody>
<tr>
<td>TinyMCE Cloud</td>
<td>Get started for free</td>
<td><strong>Yes!</strong></td>
</tr>
<tr>
<td>Plupload</td>
<td>Free</td>
<td><strong>Yes!</strong></td>
</tr>
</tbody>
</table>
<h2>Character strings to demonstrate some of the Advanced Typography plugin&rsquo;s features</h2>
<p>Select the characters in the list below and choose <strong>Tools &rarr; Typography &rarr; Enhance</strong>.</p>
<ul style="list-style-type: none;">
<li>Not really an arrow glyph: -&gt;</li>
<li>"Double tear-drop quotation marks and apostrophes aren't typographically elegant."</li>
<li>But they should be honored in a <code>code-fragment: "true"</code>.</li>
<li>(c) symbol</li>
<li>(tm) symbol</li>
<li>30C is 86F</li>
</ul>
<h2>Note on the included Templates demonstration</h2>
<p>The included Templates demonstration uses the <a class="mceNonEditable" href="../7/advanced-templates/#advtemplate_list"><code>advtemplate_list</code></a> configuration option to return a local promise containing a basic Template structure with self-contained examples.</p>
<p>This example allows for the loading of and interacting with the Template user-interface but cannot be used to create, edit, or save Template items.</p>
<p>See the <a class="mceNonEditable" href="../7/advanced-templates/">Templates</a> documentation for details on how to setup Templates to interact with external data sources.</p>
<h2>Found a bug?</h2>
<p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
<h2>Finally&hellip;</h2>
<p>Don&rsquo;t forget to check out our other product <a href="http://plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.</p>
<p>All the best from the TinyMCE team.</p>
<div style="max-width: 650px;" data-ephox-embed-iri="https://player.vimeo.com/video/253905163">
<div style="left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.25%;"><iframe style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute; border: 0px;" src="https://player.vimeo.com/video/253905163?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0" scrolling="no" allow="encrypted-media;" allowfullscreen="allowfullscreen"></iframe></div>
</div>`;

const INIT_VALUE:ProjectData = {
  name: "",
  description: "",
  category: "",
  editorState: DEFAULT_CONTENT,
  totalFundingGoal: ethers.utils.parseEther('3').toBigInt(),
  totalRound: 0,
  rounds: [{
    fundingGoal: ethers.utils.parseEther('1').toBigInt(),
    endAt: moment().add(1, 'month').endOf('day').unix(),
  },
  {
    fundingGoal: ethers.utils.parseEther('1').toBigInt(),
    endAt: moment().add(2, 'month').endOf('day').unix(),
  },
  {
    fundingGoal: ethers.utils.parseEther('1').toBigInt(),
    endAt: moment().add(3, 'month').endOf('day').unix(),
  }],
  image: null,
  external_url: ""
};

export {DEFAULT_CONTENT, INIT_VALUE};
